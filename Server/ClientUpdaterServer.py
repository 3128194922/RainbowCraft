# -*- coding: utf-8 -*-

import signal
from flask import *
from flask_cors import CORS
import time
import os
import hashlib
import threading
import sqlite3
import json

SERVER_PATH = "."
IP = "0.0.0.0"
PORT = 25564

def getFileMD5(path: str) -> str:
    with open(path, "rb") as f:
        bytes = f.read()
        return hashlib.md5(bytes).hexdigest()

class Update():
    def __init__(self, path) -> None:
        self.update_time = "0"
        self.dir = os.path.abspath(path)
        self.update_logs = "test"
        self.mods_list = dict()
        self.config_list = dict()
        self.kubejs_list = dict()
        self.hotai_list = dict()

    def makeModList(self):
        self.mods_list = {}
        self.config_list = {}
        self.kubejs_list = {}
        self.hotai_list = {}

        # mods
        for folder in ["mods", "clientmods"]:
            folder_path = os.path.join(self.dir, folder)
            if os.path.exists(folder_path):
                for f in os.listdir(folder_path):
                    full_path = os.path.join(folder_path, f)
                    self.mods_list[getFileMD5(full_path)] = f

        # config
        config_dir = os.path.join(self.dir, "clientconfig")
        if os.path.exists(config_dir):
            dirs = []
            for f in os.listdir(config_dir):
                path = os.path.join(config_dir, f)
                if os.path.isdir(path):
                    dirs.append(f)
                else:
                    self.config_list[getFileMD5(path)] = f
            while dirs:
                d = dirs.pop(0)
                current = os.path.join(config_dir, d)
                for f in os.listdir(current):
                    full_path = os.path.join(current, f)
                    rel_path = os.path.join(d, f)
                    if os.path.isfile(full_path):
                        self.config_list[getFileMD5(full_path)] = rel_path
                    else:
                        dirs.append(rel_path)

        # kubejs
        self.kubejs_list = self._scan_dir("kubejs")

        # hotai
        self.hotai_list = self._scan_dir("hotai")

    def _scan_dir(self, name):
        result = {}
        base = os.path.join(self.dir, name)
        if not os.path.exists(base):
            return result
        dirs = []
        for f in os.listdir(base):
            full = os.path.join(base, f)
            if os.path.isdir(full):
                dirs.append(f)
            else:
                result[getFileMD5(full)] = f
        while dirs:
            d = dirs.pop(0)
            current = os.path.join(base, d)
            for f in os.listdir(current):
                full = os.path.join(current, f)
                rel = os.path.join(d, f)
                if os.path.isfile(full):
                    result[getFileMD5(full)] = rel
                else:
                    dirs.append(rel)
        return result

    def makeJson(self) -> Response:
        return jsonify({
            "update_time": self.update_time,
            "update_logs": self.update_logs,
            "mods_list": list(self.mods_list.keys()),
            "config_list": list(self.config_list.keys()),
            "kubejs_list": list(self.kubejs_list.keys()),
            "hotai_list": list(self.hotai_list.keys())
        })

    def getModPath(self, md5) -> str:
        for subdir, lst in [("mods", self.mods_list), ("clientmods", self.mods_list)]:
            if md5 in lst:
                path = os.path.join(self.dir, subdir, lst[md5])
                if os.path.exists(path):
                    return path
        if md5 in self.config_list:
            path = os.path.join(self.dir, "clientconfig", self.config_list[md5])
            if os.path.exists(path):
                return path
        if md5 in self.kubejs_list:
            path = os.path.join(self.dir, "kubejs", self.kubejs_list[md5])
            if os.path.exists(path):
                return path
        if md5 in self.hotai_list:
            path = os.path.join(self.dir, "hotai", self.hotai_list[md5])
            if os.path.exists(path):
                return path
        return None

    def getModName(self, md5) -> str:
        for lst in [self.mods_list, self.config_list, self.kubejs_list, self.hotai_list]:
            if md5 in lst:
                return lst[md5]
        return None

    def commit(self, msg, file=""):
        if file != "":
            try:
                with open(SERVER_PATH + "/" + file, "r", encoding="utf-8") as f:
                    self.update_logs = f.read()
                print("已提交更新\n" + self.update_logs)
            except:
                print("读取文件失败")
        else:
            self.update_logs = msg
            print("已提交更新\n" + msg)
        self.update_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
        self.makeModList()
        saveData()

def readData():
    try:
        conn = sqlite3.connect(SERVER_PATH + "/data.db")
        cur = conn.cursor()
        cur.execute("""SELECT * FROM update_list ORDER BY update_time DESC""")
        data = cur.fetchone()
        if data:
            UPDATE.update_time = data[0]
            UPDATE.update_logs = data[1]
            UPDATE.mods_list = json.loads(data[2]) if data[2] else {}
            UPDATE.config_list = json.loads(data[3]) if data[3] else {}
            UPDATE.kubejs_list = json.loads(data[4]) if len(data) > 4 and data[4] else {}
            UPDATE.hotai_list = json.loads(data[5]) if len(data) > 5 and data[5] else {}
        else:
            UPDATE.update_time = "unknown"
            UPDATE.update_logs = "no log"
            UPDATE.mods_list = {}
            UPDATE.config_list = {}
            UPDATE.kubejs_list = {}
            UPDATE.hotai_list = {}
    except Exception as e:
        print(f"Database error: {e}")
        UPDATE.update_time = "error"
        UPDATE.update_logs = str(e)
        UPDATE.mods_list = {}
        UPDATE.config_list = {}
        UPDATE.kubejs_list = {}
        UPDATE.hotai_list = {}
    finally:
        conn.close()

def saveData():
    try:
        conn = sqlite3.connect(SERVER_PATH + "/data.db")
        cur = conn.cursor()
        cur.execute("PRAGMA table_info(update_list)")
        columns = [col[1] for col in cur.fetchall()]
        if 'hotai_list' in columns:
            sql = """INSERT INTO update_list VALUES (?,?,?,?,?,?)"""
            params = (
                UPDATE.update_time,
                UPDATE.update_logs,
                json.dumps(UPDATE.mods_list),
                json.dumps(UPDATE.config_list),
                json.dumps(UPDATE.kubejs_list),
                json.dumps(UPDATE.hotai_list)
            )
        elif 'kubejs_list' in columns:
            sql = """INSERT INTO update_list VALUES (?,?,?,?,?)"""
            params = (
                UPDATE.update_time,
                UPDATE.update_logs,
                json.dumps(UPDATE.mods_list),
                json.dumps(UPDATE.config_list),
                json.dumps(UPDATE.kubejs_list)
            )
        else:
            sql = """INSERT INTO update_list VALUES (?,?,?,?)"""
            params = (
                UPDATE.update_time,
                UPDATE.update_logs,
                json.dumps(UPDATE.mods_list),
                json.dumps(UPDATE.config_list)
            )
        cur.execute(sql, params)
        conn.commit()
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    finally:
        conn.close()

def initDatabase():
    conn = sqlite3.connect(SERVER_PATH + "/data.db")
    cur = conn.cursor()
    try:
        cur.execute("PRAGMA table_info(update_list)")
        columns = [col[1] for col in cur.fetchall()]
        if not columns:
            cur.execute("""CREATE TABLE update_list (
                update_time TEXT,
                update_logs TEXT,
                mods_list TEXT,
                config_list TEXT,
                kubejs_list TEXT,
                hotai_list TEXT
            )""")
            print("Created database with kubejs_list and hotai_list")
        else:
            if 'kubejs_list' not in columns:
                cur.execute("ALTER TABLE update_list ADD COLUMN kubejs_list TEXT")
                print("Added kubejs_list column")
            if 'hotai_list' not in columns:
                cur.execute("ALTER TABLE update_list ADD COLUMN hotai_list TEXT")
                print("Added hotai_list column")
    finally:
        conn.commit()
        conn.close()

# Flask配置
SERVER = Flask(__name__,
               template_folder=SERVER_PATH + "/web",
               static_folder=SERVER_PATH + "/web/assets")
CORS(SERVER, resources=r'/*')

@SERVER.route("/api/getupdate")
def getUpdate():
    return UPDATE.makeJson()

@SERVER.route("/api/getrangeupdate/<int:rg>")
def getRangeUpdate(rg):
    with sqlite3.connect(f"{SERVER_PATH}/data.db") as conn:
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("""
            SELECT * FROM update_list 
            ORDER BY update_time DESC 
            LIMIT 1 OFFSET ?""", (max(0, rg),))
        data = cur.fetchone()
        update = Update(SERVER_PATH)
        if data:
            update.update_time = data[0]
            update.update_logs = data[1]
            update.mods_list = json.loads(data[2])
            update.config_list = json.loads(data[3])
            update.kubejs_list = json.loads(data[4]) if len(data) > 4 else {}
            update.hotai_list = json.loads(data[5]) if len(data) > 5 else {}
        return update.makeJson()

@SERVER.route("/api/download/<md5>")
def download(md5):
    path = UPDATE.getModPath(md5)
    print(path)
    resp = send_file(path, download_name="error.txt", as_attachment=True)
    resp.headers["Path"] = UPDATE.getModName(md5).encode("utf-8").decode("latin1")
    return resp

@SERVER.route("/")
def root():
    return render_template("index.html")

def runAPI(ip=IP, port=PORT):
    SERVER.run(ip, port)

# 启动程序
if SERVER_PATH.endswith("/"):
    SERVER_PATH = SERVER_PATH[:-1]
UPDATE = Update(SERVER_PATH)

if __name__ == "__main__":
    initDatabase()
    readData()
    api = threading.Thread(target=runAPI, args=(IP, PORT))
    api.start()
    while True:
        com = input(">>>").split(maxsplit=1)
        if len(com) < 1:
            com.append("")
        if com[0] == "stop":
            os.kill(os.getpid(), signal.SIGTERM)
        elif com[0] == "commit":
            if len(com) == 1:
                print("请提供更新日志")
            else:
                if com[1].split()[0] == "-f":
                    UPDATE.commit("", com[1].split()[1])
                else:
                    UPDATE.commit(com[1])
        elif com[0] == "status":
            print("当前状态")
            print(UPDATE.update_time)
            print(UPDATE.update_logs)
            for i in UPDATE.mods_list.items():
                print(i)
            for i in UPDATE.config_list.items():
                print(i)
        else:
            print("unknow command")
            print(com)