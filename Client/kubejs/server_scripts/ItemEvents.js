// priority: 500
ItemEvents.rightClicked(event => {
  const { player, item, level, server } = event;
  const ender_chest = player.getEnderChestInventory().getAllItems();
  if (level.isClientSide()) return;

  // 粘液块平台（粘液棒）
  if (item.id === "rainbow:slime_rod") {
      const playerName = player.getName().getString();
      if (player.shiftKeyDown) {
          // 生成大型粘液块平台
          server.runCommandSilent(`/execute at ${playerName} run fill ~-2 ~-1 ~-2 ~2 ~3 ~2 minecraft:slime_block replace air`);
          server.runCommandSilent(`/execute at ${playerName} run fill ~-1 ~0 ~-1 ~1 ~2 ~1 minecraft:air replace slime_block`);
      } else {
          // 生成小型粘液块平台
          server.runCommandSilent(`/execute as ${playerName} at @s run fill ~-1 ~-3 ~-1 ~1 ~-3 ~1 minecraft:slime_block replace air`);
      }
      player.setStatusMessage('救命之恩！');
      player.setItemInHand("main_hand", 'minecraft:air');
  }

  // 爆破之星（下界之星）
  if (item.id === "minecraft:nether_star") {
      level.createExplosion(player.x, player.y - 1, player.z).explode();
  }

  // 拉屎行为（纸+潜行）
  if (item.id === "minecraft:paper" && player.shiftKeyDon) {
      item.shrink(1);
      player.addItem("rainbow:shit");
      player.setStatusMessage('你拉屎了');
  }
/*
  // 太刀冲刺
  if (item.id === "smc:katana" && !player.cooldowns.isOnCooldown("smc:katana")) {
      player.setDeltaMovement(player.getLookAngle().scale(3.0));
      player.hurtMarked = true;
      player.cooldowns.addCooldown("smc:katana", 60); // 3秒冷却
  }*/
/*
  // 闹钟（时钟）
  if (item.id === "minecraft:clock" && !player.cooldowns.isOnCooldown("minecraft:clock")) {
      const isDay = level.dayTime <= 13000;
      server.runCommandSilent(`/time set ${isDay ? "night" : "day"}`);
      server.tell(`${player.getName().getString()} 将时间调到${isDay ? "傍晚" : "清晨"}`);
      player.cooldowns.addCooldown("minecraft:clock", 60);
  }
*/
/*
  // 指南针（月相显示）
  if (item.id === "minecraft:compass" && !player.cooldowns.isOnCooldown("minecraft:compass")) {
      const moonPhaseList = ["满", "亏凸", "下弦", "残", "新", "峨嵋", "满", "满"];
      player.setStatusMessage(`今天的月像是${moonPhaseList[level.moonPhase]}月`);
      player.cooldowns.addCooldown("minecraft:compass", 60);
  }
*/
/*
  // 回溯指针（重生指南针）
  if (item.id === "minecraft:recovery_compass" && !player.cooldowns.isOnCooldown("minecraft:recovery_compass")) {
      const name = player.getDisplayName().getString();
      if (!global.deathRecords[name]) {
          player.setStatusMessage("纵使一罪，仍有百善");
      } else {
          player.setStatusMessage("不要相信时间，吾将给带来光明");
          server.runCommandSilent(`/tp ${name} ${global.deathRecords[name].x} ${global.deathRecords[name].y} ${global.deathRecords[name].z}`);
      }
      player.cooldowns.addCooldown("minecraft:recovery_compass", 60);
  }
*/
  // 末影戒指（末影箱）
  if (item.id === "rainbow:enderring") {
      player.openInventoryGUI(player.enderChestInventory, Component.translatable("container.enderchest"));
  }
// 饕餮之锅
if (item.id === "rainbow:eldritch_pan") {
    const Integer = Java.loadClass("java.lang.Integer");
    // 检查末影箱是否有物品
    if (ender_chest.length === 0) return; // 末影箱为空，直接返回

    const targetItemId = ender_chest[0].id; // 获取末影箱第一个物品的ID
    const tag = global.foodlist.indexOf(targetItemId); // 查找在 foodlist 中的索引
    // 如果未找到（tag === -1），则不处理
    if (tag === -1) return;

    // 检查主手物品的 NBT 是否有 foodlist，没有则初始化
    if (!item.nbt.foodlist) {
        item.nbt.foodlist = [];
        item.nbt.foodnumber = 0;
    }
    for(const i=0;i<item.nbt.foodlist.length;i++)
        {
            if(item.nbt.foodlist[i] == tag)
                {
                    player.setStatusMessage("这个食物已经吃过了！")
                    level.server.runCommandSilent(`/playsound minecraft:entity.player.hurt_sweet_berry_bush player @p ${player.x} ${player.y} ${player.z} 1`);
                    return;
                }
        }

    // 减少末影箱物品数量
    ender_chest[0].shrink(1);

    level.server.runCommandSilent(`/playsound minecraft:entity.player.levelup player @p ${player.x} ${player.y} ${player.z} 1`);

    // 将 tag 添加到 foodlist
    item.nbt.foodlist.push(Integer.valueOf(tag));
    item.nbt.foodnumber = item.nbt.foodlist.length;
}
});


// 吃下屎后关闭客户端
ItemEvents.foodEaten('rainbow:shit', () => Client.close())

//矿车和箱子右键安装
ItemEvents.entityInteracted(event => {
    const player = event.getPlayer();
    const hand = event.getHand();
    const item = event.getItem();
    const level = event.getLevel();
    const target = event.getTarget();
    const targetId = target.getType();
    const itemId = item.id;

    if (level.isClientSide()) return;
    if (!player.isShiftKeyDown()) return;

    const chestTags = item.hasTag('forge:chests/wooden');
    const validMinecartItems = [
        'quark:deepslate_furnace', 'quark:blackstone_furnace',
        'minecraft:furnace', 'minecraft:tnt', 'minecraft:hopper',
        'oreganized:shrapnel_bomb',
        'minecraft:chest', 'quark:acacia_chest', 'quark:jungle_chest',
        'quark:birch_chest', 'quark:spruce_chest', 'quark:oak_chest',
        'quark:blossom_chest', 'quark:azalea_chest', 'quark:ancient_chest',
        'quark:dark_oak_chest', 'quark:cherry_chest', 'quark:bamboo_chest',
        'quark:mangrove_chest', 'quark:warped_chest', 'quark:crimson_chest'
    ];

    const isBoat = ['minecraft:boat', 'blueprint:boat', 'quark:quark_boat'].includes(targetId);
    const isMinecart = BoatidOK(targetId) && !isBoat;

    // 如果目标是普通船 且 手持物品是木质箱子
    if (isBoat && chestTags) {
        const newBoatId = BoatToChestBoat(targetId);
        if (!newBoatId) return;

        const toEntity = level.createEntity(newBoatId);
        toEntity.setPosRaw(target.getX(), target.getY(), target.getZ());
        toEntity.setYaw(target.getYaw());
        toEntity.setPitch(target.getPitch());
        toEntity.setNbt(target.getNbt());

        target.remove("discarded");
        item.shrink(1);
        level.addFreshEntity(toEntity);
        return;
    }

    // 如果目标是矿车 且 手持物品是有效可合成矿车的物品
    if (isMinecart && validMinecartItems.includes(itemId)) {
        let newMinecartId = null;
        if (chestTags) {
            newMinecartId = 'minecraft:chest_minecart';
        } else {
            newMinecartId = McTo(itemId);
        }
        if (!newMinecartId) return;

        const toEntity = level.createEntity(newMinecartId);
        toEntity.setPosRaw(target.getX(), target.getY(), target.getZ());
        toEntity.setYaw(target.getYaw());
        toEntity.setPitch(target.getPitch());
        toEntity.setNbt(target.getNbt());

        target.remove("discarded");
        item.shrink(1);
        level.addFreshEntity(toEntity);
        return;
    }
});
