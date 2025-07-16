// priority: 500
//统一方块右键事件
BlockEvents.rightClicked(event=>{
    let { block, player, hand, item } = event
    let { x, y, z } = block.pos
    let level = event.level

    /**
     * @param {string} blockid 方块
     * @param {string} itemid 手中物品
     * @param {string} entityid 召唤实体的名字
     * @param {boolean} isChangeCount 是否改变物品数量
     */
    function summonBoss(blockid, itemid, entityid, isChangeCount) {
        if (block.id == blockid && item.id == itemid) {
            let entity = block.createEntity(entityid)
            entity.setPosition(x, y, z)
            entity.spawn()
            if (isChangeCount) player.mainHandItem.count--
        }
    }
    /**
     * @param {Number} r 半径
     */
    function onion(r)
    {
      level.getEntitiesWithin(AABB.ofBlock(block.pos).inflate(r)).forEach(entity=>{
        if(entity.getType() == 'minecraft:ghast')
          {
            entity.attack(1)
            entity.block.popItem('minecraft:ghast_tear')
          }
      })
      let pos = block.pos
      for (let dx = -r; dx <= r; dx++) {
        for (let dy = -r; dy <= r; dy++) {
          for (let dz = -r; dz <= r; dz++) {
            let targetPos = pos.offset(dx, dy, dz)
            let targetBlock = level.getBlock(targetPos)
            if (targetBlock.id == 'minecraft:obsidian') {
              targetBlock.set('minecraft:crying_obsidian')
            }
          }
        }
      }
    }

    // 判断是否为主手 不是主手就退出
    if (hand != 'MAIN_HAND') return
    //无限机关
    summonBoss("rainbow:organ_core","rainbow:core_key","infinitygolem:infinity_golem",true);
    //末影甲壳虫
    summonBoss("rainbow:brood_eetle_core","rainbow:brood_eetle_key","endergetic:brood_eetle",true);
    //捏雪球
    if((block.id == 'minecraft:snow_block' && item.id == 'minecraft:air') || (block.id == 'minecraft:snow' && item.id == 'minecraft:air'))
        {
            player.addItem('minecraft:snowball')
            player.getFoodData().setFoodLevel(player.getFoodData().getFoodLevel()-1)
        }
    //切洋葱
    if(block.id == 'farmersdelight:cutting_board')
      {
        if(block.getEntity().getStoredItem().getItem().toString() == 'onion'  && Ingredient.of('#farmersdelight:tools/knives').getItemIds().toArray().indexOf(item.id) != -1)
          {
            onion(1)
          }
          else if(block.getEntity().getStoredItem().getItem().toString() == 'overweight_onion_block'  && Ingredient.of('#minecraft:hoes').getItemIds().toArray().indexOf(item.id) != -1)
            {
              onion(2)
            }
      }
})
//空手调整机动管道 代码来源：https://www.bilibili.com/video/BV1H7jnzJE4A/
BlockEvents.rightClicked("create:encased_fluid_pipe", event => {
    if (event.item.id != "minecraft:air" || event.hand!="MAIN_HAND") { return }
    let currentState = event.block.properties[event.facing] == "true"
    event.level.setBlockAndUpdate(
      event.block.pos,
      event.block.blockState.setValue(
        BlockProperties[event.facing.toString().toUpperCase()],
        Java.loadClass("java.lang.Boolean")[currentState ? "FALSE" : "TRUE"]
      )
    )
    event.server.runCommandSilent(
      `playsound minecraft:block.copper_trapdoor.${currentState ? "close" : "open"}
      master @a ${event.block.x} ${event.block.y} ${event.block.z} 0.5 1`
    );
    event.entity.swing()
  })