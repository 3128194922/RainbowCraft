// priority: 0
NetworkEvents.dataReceived("projectlie", (event) => {
    let x = event.data.x
    let y = event.data.y
    let z = event.data.z
    let viewX = event.data.viewX
    let viewY = event.data.viewY
    let viewZ = event.data.viewZ
    let projectlieName = event.data.name
    if(event.player.isHolding("rainbow:terasword")) {
        let projectlie = event.level.createEntity(projectlieName) //创建发射物
        projectlie.setPosition(x, y, z) //设置发射位置
        projectlie.setMotion(viewX * 3, viewY * 3, viewZ * 3) //设置发射速度
        projectlie.setOwner(event.player) //设置发射者
        projectlie.spawn() //生成发射物
        event.server.runCommandSilent(`/playsound cataclysm:harbinger_laser voice @p ${x} ${y} ${z}`)
    }
})
NetworkEvents.dataReceived("primaryCharm", (event) => {
if(hasCurios(event.player,"rainbow:mind"))
    {
        let player = event.player;

        let yaw = player.getYaw();    
        let pitch = player.getPitch();
    
        let dx = 0;
        let dy = 0;
        let dz = 0;
        let wallDirection = "";
    
        if (pitch < -60) {
            // 玩家仰头（朝上）
            dy = 2;  
            wallDirection = "down";
        } else if (pitch > 60) {
            // 玩家俯视（朝下）
            dy = -2;
            wallDirection = "up";
        } else {
            let yaw360 = yaw < 0 ? yaw + 360 : yaw;
    
            if (yaw360 >= 45 && yaw360 < 135) {
                dx = -2;
                wallDirection = "east";
            } else if (yaw360 >= 135 && yaw360 < 225) {
                dz = -2;
                wallDirection = "south";
            } else if (yaw360 >= 225 && yaw360 < 315) {
                dx = 2;
                wallDirection = "west";
            } else {
                dz = 2;
                wallDirection = "north";
            }
        }
        wallDirection = reverseDirection(wallDirection);
    
        let summonX = Math.floor(player.x) + dx;
        let summonY = Math.floor(player.y) + dy;
        let summonZ = Math.floor(player.z) + dz;
    
        let directionMap = {
            "down": 0,
            "up": 1,
            "north": 2,
            "south": 3,
            "west": 4,
            "east": 5
        };
        let wallDirVal = directionMap[wallDirection];
    
        event.server.runCommandSilent(
            `execute as ${player.displayName.getString()} at @s run summon domesticationinnovation:psychic_wall ${summonX} ${summonY} ${summonZ} ` +
            `{Lifespan:1200, BlockWidth:5, WallDirection:${wallDirVal}}`
        );
    }
});

