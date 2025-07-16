// priority: 1000
//死亡回放
global.deathRecords = {};
/*
PlayerEvents.respawned(event => {
    let playerName = event.oldPlayer.getDisplayName().getString();
    let deathPos = {
        x: event.oldPlayer.x,
        y: event.oldPlayer.y,
        z: event.oldPlayer.z,
        dimension: event.oldPlayer.level.dimension,
        yaw: event.oldPlayer.yaw,
        pitch: event.oldPlayer.pitch
    };
    
    // 按玩家名称存储坐标（支持多次死亡记录）
        global.deathRecords[playerName]= {
            x: event.oldPlayer.x,
            y: event.oldPlayer.y,
            z: event.oldPlayer.z,
            dimension: event.oldPlayer.level.dimension,
            yaw: event.oldPlayer.yaw,
            pitch: event.oldPlayer.pitch
        };
    console.log(event.getEntity().x)
    console.log(event.oldPlayer.y)
    console.log(event.oldPlayer.z)

    // 打印当前记录（调试用）
    console.log(`玩家 ${playerName} 死亡位置记录：`, global.deathRecords[playerName]);
});
*/
EntityEvents.death(event=>{
    if(!event.getPlayer()) return;
    if(event.level.isClientSide()) return;

    let level = event.getLevel();
    let server = event.getServer();
    let player = event.getPlayer();
    let playerName = event.getPlayer().getDisplayName().getString();
    let deathPos = {
        x: event.player.x,
        y: event.player.y,
        z: event.player.z,
        dimension: event.player.level.dimension,
        yaw: event.player.yaw,
        pitch: event.player.pitch
    };

    // 按玩家名称存储坐标（支持多次死亡记录）
    global.deathRecords[playerName]= {
        x: event.player.x,
        y: event.player.y,
        z: event.player.z,
        dimension: event.player.level.dimension,
        yaw: event.player.yaw,
        pitch: event.player.pitch
    };

    // 打印当前记录（调试用）
    //console.log(`玩家 ${playerName} 死亡位置记录：`, global.deathRecords[playerName]);
})

ServerEvents.commandRegistry(event => {
    let { commands: Commands, arguments: Arguments } = event;

    // /tpa <target>
    event.register(
        Commands.literal("tpa")
            .requires(src => src.hasPermission(0))
            .then(
                Commands.argument("target", Arguments.STRING.create(event))
                    .suggests((ctx, builder) => {
                        let playerNames = ctx.source.server.getPlayerNames();
                        playerNames.forEach(name => builder.suggest(name));
                        return builder.buildFuture();
                    })
                    .executes(ctx => {
                        let requester = ctx.source.player;
                        let targetName = Arguments.STRING.getResult(ctx, "target");
                        let targetPlayer = ctx.source.server.getPlayer(targetName);

                        if (!targetPlayer) {
                            requester.tell(`§c玩家 ${targetName} 不存在或不在线`);
                            return 0;
                        }

                        requester.teleportTo(
                            targetPlayer.level.dimension,
                            targetPlayer.x,
                            targetPlayer.y,
                            targetPlayer.z,
                            targetPlayer.yaw,
                            targetPlayer.pitch
                        );

                        targetPlayer.tell(`§e玩家 ${requester.getDisplayName().getString()} 传送到你身边`);
                        return 1;
                    })
            )
    );

    // /back
    event.register(
        Commands.literal("back")
            .requires(src => src.hasPermission(0))
            .executes(ctx => {
                let player = ctx.source.player;
                let playerName = player.getDisplayName().getString();

                if (!global.deathRecords || !global.deathRecords[playerName]) {
                    player.tell("§c你没有可返回的死亡位置");
                    return 0;
                }

                let pos = global.deathRecords[playerName];
                player.teleportTo(
                    pos.dimension,
                    pos.x,
                    pos.y,
                    pos.z,
                    pos.yaw || 0,
                    pos.pitch || 0
                );

                player.tell(`§a已返回你上次死亡的位置 (${pos.x}, ${pos.y}, ${pos.z})`);
                return 1;
            })
    );

    // /register <password>
    event.register(
        Commands.literal("register")
            .requires(src => src.hasPermission(0))
            .then(
                Commands.argument("password", Arguments.STRING.create(event))
                    .executes(ctx => {
                        const player = ctx.source.player;
                        const data = player.persistentData;
                        const password = Arguments.STRING.getResult(ctx, "password");

                        if (data.contains("password")) {
                            player.tell("§c你已经注册过了！");
                            return 0;
                        }

                        data.putString("password", password);
                        player.tell("§a注册成功！");
                        return 1;
                    })
            )
    );

    // /login <password>
    event.register(
        Commands.literal("login")
            .requires(src => src.hasPermission(0))
            .then(
                Commands.argument("password", Arguments.STRING.create(event))
                    .executes(ctx => {
                        const player = ctx.source.player;
                        const data = player.persistentData;
                        const inputPassword = Arguments.STRING.getResult(ctx, "password");

                        if (!data.contains("password")) {
                            player.tell("§e你还没有注册，请使用 /register <密码> 注册！");
                            return 0;
                        }

                        if (data.getString("password") === inputPassword) {
                            player.setGameMode("survival");
                            player.tell("§a登录成功，已切换到生存模式！");
                            return 1;
                        } else {
                            player.tell("§c密码错误！");
                            return 0;
                        }
                    })
            )
    );
//重置密码
    event.register(
        Commands.literal("resetpassword")
            .requires(src => src.hasPermission(4)) // 需要权限等级 4
            .then(
                Commands.argument("target", Arguments.STRING.create(event))
                    .suggests((ctx, builder) => {
                        // 在线玩家名补全
                        let playerNames = ctx.source.server.getPlayerNames();
                        playerNames.forEach(name => builder.suggest(name));
                        return builder.buildFuture();
                    })
                    .executes(ctx => {
                        let sender = ctx.source.player;
                        let targetName = Arguments.STRING.getResult(ctx, "target");
                        let targetPlayer = ctx.source.server.getPlayer(targetName);
    
                        if (!targetPlayer) {
                            sender.tell(`§c玩家 ${targetName} 不存在或不在线`);
                            return 0;
                        }
    
                        let targetData = targetPlayer.persistentData;
    
                        if (targetData.contains("password")) {
                            targetData.remove("password");
                            sender.tell(`§a已成功清除玩家 ${targetName} 的密码`);
                            targetPlayer.tell("§e你的密码已被管理员重置，请重新使用 /register 设置密码");
                            return 1;
                        } else {
                            sender.tell(`§e玩家 ${targetName} 尚未注册，无需重置`);
                            return 0;
                        }
                    })
            )
    );
    
});



//统一进入世界事件
PlayerEvents.loggedIn(event=>{
    if(event.level.isClientSide()) return;
    let player = event.player;
    let server = event.server;
    //登陆系统
    player.setGameMode("spectator")
    if(player.persistentData.getString('password') == "")
        {
            player.tell("你需要注册才能正常游玩服务器 请输入 /register <你的密码 不加括号>")
        }
    else
    {
        player.tell("你需要登陆才能正常游玩服务器 请输入 /login <你的密码 不加括号>")
    }


    if(event.getPlayer().stages.has("curios_is_ok")) return;

    //饰品初始化
    server.runCommandSilent(`/curios reset ${player.getDisplayName().getString()}`);
    let Curios = ["body","belt","bracelet","curio","hands","necklace","ring","feet","hands"]
    Curios.forEach(curio=>{
        event.server.runCommandSilent(`/curios remove ${curio} ${player.getDisplayName().getString()} 1`);
    })
    //护符实际数量
    global.CURIONUMBER = 4
    server.runCommandSilent(`/curios set charm ${player.getDisplayName().getString()} ${global.CURIONUMBER}`);
    player.stages.add("curios_is_ok")

    server.runCommandSilent(`/execute as ${player.getDisplayName().getString()} run dialog show hello_world`)
});
//玩家统计数据上传
PlayerEvents.loggedOut(event => {
    if(true) return;
    
    let player = event.getPlayer();
    let playerUUID = player.getUuid().toString();

    let playerData = {
        name: player.getDisplayName().getString(),
        playTime: player.stats.getPlayTime(),
        lastLogout: new Date().toISOString()
    };

    // 定义路径
    let playerDataFile = 'kubejs/PlayerDate.json';
    let logFilePath = 'logs/PlayerDate.txt';

    // 创建目录（如果不存在）
    if (!FilesJS.exists('kubejs')) FilesJS.createDirectory('kubejs');
    if (!FilesJS.exists('logs')) FilesJS.createDirectory('logs');

    // 初始化存储对象
    let allData = {};

    // 读取原有 JSON 数据（若存在）
    if (FilesJS.exists(playerDataFile)) {
        try {
            let content = FilesJS.readFile(playerDataFile);
            if (content.trim() !== '') {
                allData = JSON.parse(content);
            } else {
                console.warn("PlayerDate.json 是空文件，初始化为 {}");
            }
        } catch (e) {
            console.error(`读取 PlayerDate.json 时出错: ${e}`);
            allData = {};
        }
    }

    // 更新或添加该玩家数据
    allData[playerUUID] = playerData;

    // 写入文件（格式化 JSON）
    FilesJS.writeFile(playerDataFile, JSON.stringify(allData, null, 2));

    // 构造并追加日志
    let logEntry = `[${playerData.lastLogout}] 玩家 ${playerData.name} (UUID: ${playerUUID}) 退出，游玩时间: ${playerData.playTime} tick`;
    FilesJS.appendLine(logFilePath, logEntry);
});
