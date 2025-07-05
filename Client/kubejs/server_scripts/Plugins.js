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

//统一指令注册
ServerEvents.commandRegistry(event => {
    let { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal("tpa")
            .requires(src => src.hasPermission(0))
            .then(Commands.argument('target', Arguments.STRING.create(event))
                .suggests((ctx, builder) => {
                    // 获取所有在线玩家名称
                    let onlinePlayers = ctx.source.server.getPlayerNames();
                    // 为每个在线玩家添加建议
                    onlinePlayers.forEach(player => builder.suggest(player));
                    return builder.buildFuture();
                })
                .executes(ctx => {
                    let requester = ctx.source.player;
                    let targetName = Arguments.STRING.getResult(ctx, "target");
                    let targetPlayer = ctx.source.server.getPlayer(targetName);
                    
                    if (!targetPlayer) {
                        requester.tell(`玩家 ${targetName} 不存在或不在线`);
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

                    targetPlayer.tell(`玩家${requester.getDisplayName().getString()}传送到你身边`)
                    
                    return 1;
                })
            )
    );

    event.register(
        Commands.literal("back")
            .requires(src => src.hasPermission(0))
            .executes(ctx => {
                let player = ctx.source.player;
                let playerName = player.getDisplayName().getString();
                
                // 检查是否有死亡记录
                if (!global.deathRecords[playerName]) {
                    player.tell("你没有可返回的死亡位置");
                    return 0;
                }
                
                let deathPos = global.deathRecords[playerName];
                
                // 执行传送
                player.teleportTo(
                    deathPos.dimension,
                    deathPos.x,
                    deathPos.y,
                    deathPos.z,
                    deathPos.yaw || 0,
                    deathPos.pitch || 0
                );
                
                player.tell(`已返回你上次死亡的位置 (${deathPos.x}, ${deathPos.y}, ${deathPos.z})`);
                return 1;
            })
    );

    event.register(
        Commands.literal("sdwww")
            .requires(src => src.hasPermission(0))
            .executes(ctx => {
                let player = ctx.source.player;
                let server = player.getServer();
                
                if (hasCurios(player, "minecraft:tnt")) {
                    server.runCommandSilent(`/summon minecraft:tnt ${player.x} ${player.y} ${player.z}`);
                    player.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
                } else if (hasCurios(player, "oreganized:shrapnel_bomb")) {
                    server.runCommandSilent(`/summon oreganized:shrapnel_bomb ${player.x} ${player.y} ${player.z}`);
                    player.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
                } else if (hasCurios(player, "savage_and_ravage:spore_bomb")) {
                    server.runCommandSilent(`/summon savage_and_ravage:spore_bomb ${player.x} ${player.y} ${player.z}`);
                    player.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
                } else {
                    player.tell("没有装备对应的tnt饰品！")
                }
                return 1;
            })
    );

});

//统一进入世界事件
PlayerEvents.loggedIn(event=>{
    if(event.level.isClientSide()) return;
    if(event.getPlayer().stages.has("curios_is_ok")) return;
    let player = event.player;
    let server = event.server;
    //饰品初始化
    console.log("测试")

    event.server.runCommandSilent(`/curios reset ${event.player.getDisplayName().getString()}`);
    let Curios = ["body","belt","bracelet","curio","hands","necklace","ring","feet","hands"]
    Curios.forEach(curio=>{
        event.server.runCommandSilent(`/curios remove ${curio} ${event.player.getDisplayName().getString()} 1`);
    })
    //护符实际数量
    global.CURIONUMBER = 4
    event.server.runCommandSilent(`/curios set charm ${event.player.getDisplayName().getString()} ${global.CURIONUMBER}`);
    event.getPlayer().stages.add("curios_is_ok")

    server.runCommandSilent(`/execute as ${player.getDisplayName().getString()} run dialog show hello_world`)
});
//玩家统计数据上传
PlayerEvents.loggedOut(event => {
    if(event.level.isClientSide()) return;
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
