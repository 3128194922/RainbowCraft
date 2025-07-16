// priority: 500
// 监听伤害事件
EntityEvents.hurt(event => {
    const { entity,source } = event;
    // 玩家免疫伤害逻辑
    if (entity.isPlayer()) {
        if (!entity.level.isClientSide && entity.hasEffect("rainbow:democratic_save")) {
            event.cancel(); // 取消伤害
            return; // 提前返回避免后续处理
        }
    }

    // 黏液棒攻击逻辑
    if (source.player && entity) {
        if (source.player.getMainHandItem().id === "rainbow:slime_rod") {
            // 移除受害者所有护甲
            ["chest", "feet", "head", "legs"].forEach(slot => {
                if (entity.getItemBySlot(slot) && !entity.getItemBySlot(slot).isEmpty()) {
                    entity.block.popItem(entity.getItemBySlot(slot).id); // 掉落护甲
                    entity.getItemBySlot(slot).shrink(1); // 移除护甲
                }
            });
            
            // 消耗黏液棒耐久
            source.player.getMainHandItem().shrink(1);
        }
    }
});
//实体生成事件
EntityEvents.spawned(event => {
    const entity = event.getEntity();

    if (entity.getEncodeId() == null) return;
    //永恒之门
    if(entity.getEncodeId().toString() === "gateways:endless_gateway")
        {
        }

    if(entity.getEncodeId().toString() === "gateways:normal_gateway")
        {
        }
/*
    //幽灵矿工
    if (entity.getEncodeId().toString() === "alexsmobs:underminer") {
        const itemInHand = entity.getItemInHand("main_hand");
        if (itemInHand.getId().toString() === "alexsmobs:ghostly_pickaxe") {
            // 获取或创建 NBT 标签
            const nbt = itemInHand.getNbt() || {};
            // 设置 Unbreakable 为 true
            nbt.Unbreakable = 1;
            // 将修改后的 NBT 标签应用回物品
            itemInHand.setNbt(nbt);
        }
    }

    //诅咒玩偶
    if (entity.getEncodeId().toString() === "hmag:cursed_doll") {
        const weaponslist = ['dungeonsdelight:golden_cleaver','dungeonsdelight:iron_cleaver']
        entity.setItemSlot("mainhand",weaponslist[randomBool(0.5)?0:1])
    }
    //末地处刑少女
    if (entity.getEncodeId().toString() === "hmag:ender_executor") {
        entity.setItemSlot("mainhand",'savage_and_ravage:cleaver_of_beheading')
    }
    //小恶魔
    if (entity.getEncodeId().toString() === "hmag:imp") {
        entity.setItemSlot("mainhand",'savage_and_ravage:cleaver_of_beheading')
        if(randomBool(0.05))
            {
                entity.setItemSlot("offhand","rainbow:mozhua")
            }
    }
    //狗头人
    if (entity.getEncodeId().toString() === "hmag:kobold") {
        entity.setItemSlot("mainhand",'hmag:iron_spear')
        if(randomBool(0.2))
        {
            entity.setItemSlot("offhand",Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:encyclopedia"}'))
        }
    }*/
//禁用生成
/*    const list = ['hmag:kobold_spawn_egg', 'hmag:redcap_spawn_egg', 'hmag:imp_spawn_egg',
     'hmag:ghost_spawn_egg', 'hmag:wither_ghost_spawn_egg', 'hmag:melty_monster_spawn_egg', 
     'hmag:jack_frost_spawn_egg', 'hmag:hornet_spawn_egg', 'hmag:kasha_spawn_egg', 
     'hmag:slime_girl_spawn_egg', 'hmag:snow_canine_spawn_egg', 'hmag:nightwalker_spawn_egg']
    removeSpawnEggSuffix(list).forEach(entityId=>{
        if (entity.getEncodeId().toString() == `${entityId}`) {
            event.cancel()
        }
    })*/
});

EntityEvents.death(event=>{
    const server = event.getServer();
    const entity = event.getEntity();
    const attacker = event.getSource().getPlayer();

    //tnt背包
    if (hasCurios(entity, "minecraft:tnt")) {
        server.runCommandSilent(`/summon minecraft:tnt ${entity.x} ${entity.y} ${entity.z}`);
        entity.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
    } else if (hasCurios(entity, "oreganized:shrapnel_bomb")) {
        server.runCommandSilent(`/summon oreganized:shrapnel_bomb ${entity.x} ${entity.y} ${entity.z}`);
        entity.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
    } else if (hasCurios(entity, "savage_and_ravage:spore_bomb")) {
        server.runCommandSilent(`/summon savage_and_ravage:spore_bomb ${entity.x} ${entity.y} ${entity.z}`);
        entity.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
    }
    //赌徒骰子
    if(hasCurios(attacker,"rainbow:dice"))
        {
            const lucky = attacker.getAttribute("minecraft:generic.luck").getValue();
            const mainHandItem = attacker.getItemInHand("main_hand").getId();
            const offHandItem = attacker.getItemInHand("off_hand").getId();
            if(randomBool(lucky/10.0))
                {
                    attacker.cooldowns.removeCooldown(mainHandItem);
                    attacker.cooldowns.removeCooldown(offHandItem);
                }
        }
    //怪物猎人勋章
    if(hasCurios(attacker,"rainbow:monster_charm"))
    {
        attacker.potionEffects.add("neapolitan:berserking",SecoundToTick(5),0,false,false)
    }
})

global.TauntEffectEvent = (mob, lvl) => {
    if (!mob || mob.level.isClientSide()) return
    if (mob.age % 20 != 0) return
    let mobAABB = mob.boundingBox.inflate(16)
    mob.level.getEntitiesWithin(mobAABB).forEach(entity => {
        if (!entity) return
        if (!entity.isLiving() || !entity.isAlive()) return;
        if (typeof entity.setTarget === 'function') { 
            entity.setTarget(mob);
        }
    })
}
