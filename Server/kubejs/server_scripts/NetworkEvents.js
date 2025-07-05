// priority: 0
NetworkEvents.dataReceived("projectlie", (event) => {
    const x = event.data.x
    const y = event.data.y
    const z = event.data.z
    const viewX = event.data.viewX
    const viewY = event.data.viewY
    const viewZ = event.data.viewZ
    const projectlieName = event.data.name
    if(event.player.isHolding("rainbow:terasword")) {
        const projectlie = event.level.createEntity(projectlieName) //创建发射物
        projectlie.setPosition(x, y, z) //设置发射位置
        projectlie.setMotion(viewX * 3, viewY * 3, viewZ * 3) //设置发射速度
        projectlie.setOwner(event.player) //设置发射者
        projectlie.spawn() //生成发射物
    }
})
