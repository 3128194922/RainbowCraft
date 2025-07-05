// priority: 500
//玩家统一Tick事件
PlayerEvents.tick((event) => {
  const { player,server } = event;
  const NEWFILENUMBER = 3;
  //玩家草丛隐身
  if(player.level.isClientSide()) return;

  if(player.age%20) return;

  if(player.shiftKeyDown && player.block.id === "minecraft:tall_grass" && !player.hasEffect("invisibility"))
    {
      player.potionEffects.add("invisibility", -1, 0, false, false);
    }
  else
    {
      player.removeEffect("invisibility");
    }

  if(hasCurios(player,"rainbow:newfile"))
    {
      server.runCommandSilent(`/curios remove charm ${player.getDisplayName().getString()} ${global.CURIONUMBER}`);
      server.runCommandSilent(`/curios set body ${player.getDisplayName().getString()} ${NEWFILENUMBER}`);
      server.runCommandSilent(`/curios set ring ${player.getDisplayName().getString()} 1`);
    }
    else
    {
      server.runCommandSilent(`/curios set charm ${player.getDisplayName().getString()} ${global.CURIONUMBER}`);
      server.runCommandSilent(`/curios remove body ${player.getDisplayName().getString()} ${NEWFILENUMBER}`);
      server.runCommandSilent(`/curios remove ring ${player.getDisplayName().getString()} 1`);
    }

    if(player.getMainHandItem().id == "rainbow:eldritch_pan")
      {
        player.modifyAttribute("generic.attack_damage","eldritch_pan",player.getMainHandItem().getNbt().getInt("foodnumber")*10,"addition")
      }
    else
    {
      player.removeAttribute("generic.attack_damage","eldritch_pan")
    }

  if(player.age%200) return;

    if(hasCurios(player,"rainbow:daawnlight_spirit_origin"))
      {
        player.server.runCommandSilent(`/execute as ${player.getDisplayName().getString()} at @s run effect give @e[distance=..10,name=!${player.getDisplayName().getString()}] rainbow:tag 3`)
      }
});

PlayerEvents.inventoryChanged((event) => {
  const { item, player, slot } = event;

})

//传送门挑战
/*ItemEvents.rightClicked(event => {
  const player = event.player;
  const heldItem = player.getMainHandItem();
  const server = event.server;

  // 检查玩家是否持有传送门珍珠
  if (heldItem.id === 'gateways:gate_pearl') {
      // 获取玩家所在维度
      const dimension = player.level.dimension;
      if(dimension.toString() == "minecraft:the_end")
        {
          
        }
      else
      {
      // 向玩家发送反馈消息
      player.tell(`你当前位于维度 ${dimension} 不符合开启要求`);
      return;
      }
      server.runCommandSilent(`/say 玩家 ${player.name} 在维度 ${dimension} 使用了传送门珍珠`);

  }
});*/

/*
PlayerEvents.tick((event) => {

  
  if(event.player.age%20) return;

  let { entity } = event; 

  if(event.player.level.isClientSide()) return;
  
  if(!entity.isPlayer()) return;
// 获取玩家的 Curios 物品栏
const curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
const curiosInventory = curiosApi.getCuriosInventory(entity).resolve().get();
  //获取栏位4的物品ID(栏位从0开始，从左到右)
  if(curiosInventory.getEquippedCurios().getStackInSlot(4).getId() === "fromtheshadows:corrupted_heart" && entity.getArmorValue() < 10)
  {
  entity.potionEffects.add("minecraft:regeneration", -1, 1, false, false);
  }
  else
  {
  entity.removeEffect("minecraft:regeneration");
  }
});*/
/*
//木棍
ItemEvents.rightClicked('stick', event => {
  //从事件中解构出对象待用
  const { player, level } = event;
  // 获取玩家的视角向量并标准化
  const viewVector = player.getViewVector(1.0);
  const length = Math.sqrt(viewVector.x() * viewVector.x() + viewVector.y() * viewVector.y() + viewVector.z() * viewVector.z());
  const normalizedVector = {
    x: viewVector.x() / length,
    y: viewVector.y() / length,
    z: viewVector.z() / length
  };
  const projectile = level.createEntity("fromtheshadows:player_breath");
  //设定发射坐标
  projectile.setPosition(player.x, player.y + 1.6, player.z);
  // 设定速度基数
  const velocity = 2;
  // 设定弹射物方向
  projectile.setMotion(normalizedVector.x * velocity, normalizedVector.y * velocity, normalizedVector.z * velocity);
  // 设定弹射物发射者
  projectile.setOwner(player)
   // 设定弹射物nbt
  projectile.mergeNbt({ pickup: 2, damage: 4, PierceLevel: 5 })
  // 生成弹射物
  projectile.spawn();
  });*/
/*
const PlayerBreathEntity = Java.loadClass('net.sonmok14.fromtheshadows.server.entity.projectiles.PlayerBreathEntity')
const EntityRegistry = Java.loadClass('net.sonmok14.fromtheshadows.server.utils.registry.EntityRegistry')

ItemEvents.rightClicked('stick', event => {
    const player = event.player
    const item = event.item

    if(player.level.isClientSide()) return;
        // 1. 计算角度（必须转换为弧度！）
        const yaw = (player.yHeadRot + 90) * Math.PI / 180
        const pitch = -player.xRot * Math.PI / 180

        // 2. 通过 EntityRegistry 获取正确的 EntityType
        const playerBreathType = EntityRegistry.PLAYER_BREATH.get()

        // 3. 创建抛射体（使用完整构造函数）
        const projectile = new PlayerBreathEntity(
            playerBreathType,    // 从注册表获取的EntityType
            player.level,
            player,             // 发射者（caster）
            player.x,           // 起始X
            player.y-3,     // 起始Y（玩家眼睛高度）
            player.z,           // 起始Z
            yaw,                // 水平角度（弧度）
            pitch,              // 垂直角度（弧度）
            100                 // 持续时间（ticks，100=5秒）
        )

        // 4. 设置火焰效果（根据源码需求）
        projectile.setFire(true)

        // 5. 添加到世界
        player.level.addFreshEntity(projectile)

        // 6. 播放音效和冷却
        player.playSound('fromtheshadows:soul_laser', 1.0, 1.0)
        player.cooldowns.addCooldown(item.getItem(), 40)
})*/

/*
const { minecraft } = require('kubejs')
const { EntityType, SoundEvents, DamageTypes } = minecraft

ItemEvents.rightClicked('minecraft:echo_shard', event => {
  const player = event.player
  const item = event.item

    if(player.level.isClientSide()) return;

        const projectile = EntityType.SNOWBALL.create(player.level)
        projectile.setPos(
            player.x,
            player.y + 1.5, // 从玩家眼睛高度发射
            player.z
        )

        const look = player.getLookAngle()
        projectile.setDeltaMovement(
            look.x * 3.0, // X方向速度
            look.y * 3.0, // Y方向速度
            look.z * 3.0  // Z方向速度
        )

        projectile.persistentData.putBoolean('sonicBoom', true)
        projectile.persistentData.putUUID('shooter', player.getUUID())

        // 5. 添加到世界
        player.level.addFreshEntity(projectile)
})*/

// 监听玩家每刻(tick)事件(每秒约20次触发)
/*PlayerEvents.tick((event) => {
  // 从事件对象中解构出玩家对象
  const { player } = event;

  // 检查玩家是否正在潜行(按住Shift键)并且脚下的方块是高草丛
  if (player.shiftKeyDown && player.block.id === "minecraft:tall_grass") {
    // 如果玩家当前没有隐身效果
    if (!player.hasEffect("invisibility")) {
      // 给玩家添加无限时间的隐身效果
      // 参数解释: 
      // "invisibility" - 效果类型(隐身)
      // -1 - 持续时间(刻)，-1表示无限
      // 0 - 效果等级(0为I级)
      // false - 是否显示粒子效果
      // false - 是否显示图标
      player.potionEffects.add("invisibility", -1, 0, false, false);
    }
  } else {
    // 如果不满足条件(不潜行或不在高草上)，移除隐身效果
    player.removeEffect("invisibility");
  }
});*/