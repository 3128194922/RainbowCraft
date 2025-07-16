// priority: 1010
/*StartupEvents.registry("enchantment", event => {
    event.create("rainbow:livingrepair", "basic")
        .category("breakable")
        .maxLevel(3)
        .postHurt((source, target, level) => {
            if (source.isLiving()) {
                // 获取治疗量并计算应恢复的耐久值
                const healAmount = source.getAttribute("attributeslib:healing_received").getValue();
                const durabilityToRestore = healAmount * level;
                
                // 获取主手物品（假设是武器）
                const weapon = source.getMainHandItem();
                
                if (!weapon.isEmpty()) {
                    // 计算并设置新的耐久值
                    const currentDamage = weapon.getDamageValue();
                    const newDamage = Math.max(0, currentDamage - durabilityToRestore);
                    weapon.setDamageValue(newDamage);
                    
                    // 更新物品
                    source.setMainHandItem(weapon);
                }
            }
        })
        .displayName("生命修复");
});*/
StartupEvents.registry("enchantment", (event) => {
    event.create("rainbow:last_stand").armor().maxLevel(2);
});
StartupEvents.registry("block", event => {
    //event.create(方块id, 方块类型)
    event.create("rainbow:luckyblock", "basic").requiresTool(true).grassSoundType().tagBlock("minecraft:mineable/shovel")
    //霜冻金属矿
    event.create("rainbow:frostium_ore", "basic").material(getMaterialJS("STONE")).requiresTool().tagBlock(getMinecraftToolTag("镐")).tagBlock(getMinecraftToolTag("铁")).stoneSoundType()
    //霜冻金属矿
    event.create("rainbow:blue_ice_frostium_ore", "basic").material(getMaterialJS("STONE")).requiresTool().tagBlock(getMinecraftToolTag("镐")).tagBlock(getMinecraftToolTag("铁")).stoneSoundType()
    //霜冻金属块
    event.create("rainbow:frostium_block", "basic").material(getMaterialJS("ICE")).stoneSoundType()
    //虚空矿
    event.create("rainbow:void_ore", "basic").material(getMaterialJS("STONE")).requiresTool().tagBlock(getMinecraftToolTag("镐")).tagBlock(getMinecraftToolTag("铁")).stoneSoundType()
    //绿幕方块
    event.create("rainbow:greenblock", "basic").opaque(true).suffocating(false).redstoneConductor(false).transparent(true)
    //傀儡核心
    event.create("rainbow:organ_core", "basic").unbreakable()
    //末影甲虫
    event.create("rainbow:brood_eetle_core", "basic").unbreakable()
})
StartupEvents.registry("fluid",event =>{
//黄铜液体
    event.create("rainbow:brass_fluid").thickTexture(0xF3E03B).noBucket().noBlock()
//铜液体
    event.create("rainbow:copper_fluid").thickTexture(0xFA842B).noBucket().noBlock()
//710液体
    event.create("rainbow:oil").thickTexture("BLACK").noBlock()
//液态逻辑
    event.create("rainbow:number_water")
    .stillTexture("rainbow:fluid/number_water")
    .flowingTexture("rainbow:fluid/number_water")
    .temperature(1000)
    .viscosity(1500)
    .density(6000)
    .noBlock()
    .bucketColor("BLUE")
})
//物品增加
StartupEvents.registry("item",event=>{

    //牢大饮料
    event.create('rainbow:ice_tea','basic')
    .tooltip("获得曼巴之力，攻击带有更强击退和曼巴音效(WIP)")
    .tooltip("想你了，牢大")
    .maxStackSize(1)
    .rarity('epic')
    .useAnimation('drink')
    .use((level, player, hand) => {
        return true;
    })
    .useDuration(itemStack => 20)
    .finishUsing((itemstack, level, entity) => {
        if (level.isClientSide()) return itemstack
        level.server.runCommandSilent(`/playsound rainbow:man player @p ${entity.x} ${entity.y} ${entity.z} 1`)
        entity.potionEffects.add('rainbow:manba', 200, 1)
        return itemstack;
    })

    //event.create('frost_layer', 'helmet')

    //大肉面
    //敢删我大肉面？我肘亖你！    

    event.create("rainbow:tengzou_noodles","basic").maxStackSize(64).rarity("epic")
        .food(foodBuilder=>{
            foodBuilder
            .alwaysEdible()
            .meat()
            .hunger(20)
            .saturation(1.0)
            .effect("farmersdelight:nourishment",3600,1,1)
            .effect("farmersdelight:comfort",3600,1,1)
        })
        .tooltip("出了滕州你才发现，这面有多么好吃")
    //寰宇支配之剑
    event.create("rainbow:god_sword","sword").maxDamage(-1).attackDamageBonus(9999).rarity("epic")
    //莫名的悲伤
    event.create("rainbow:teardrop_sword","sword")
    .maxDamage(522)
    .attackDamageBonus(3)
    .maxStackSize(1)
    .tooltip("攻击会使敌人着火15秒")
    .tooltip("有33%会造成3秒莫名的悲伤减益")
    //玻璃刀
    event.create("rainbow:glass_sword","sword").maxDamage(1).attackDamageBonus(16).maxStackSize(64).attackDamageBaseline(4.0)
    .tooltip("存粹的数值")
    //决斗剑
    event.create("rainbow:duel","sword").maxDamage(100).attackDamageBonus(16).maxStackSize(64).attackDamageBaseline(4.0)
    .tooltip("攻击同一类型生物伤害增加1.5")
    //末影戒指
    event.create("rainbow:enderring","basic")
    .tooltip("右键可快捷打开末影箱")
    //霜冻金属锭
    event.create("rainbow:frostium_ingot","basic")
    //霜冻金属粒
    event.create("rainbow:frostium_nugget","basic")
    //霜冻粗矿
    event.create("rainbow:raw_frostium","basic")
    //虚空粗矿
    event.create("rainbow:raw_voidore","basic")
    //魔爪
    event.create("rainbow:mozhua","basic")
    //霜冻金属斧
    event.create("rainbow:frostium_axe","axe").attackDamageBonus(5.0).attackDamageBaseline(3.0).maxDamage(501)
    .tooltip("对霜冻buff的敌人1.5倍伤害")
    //霜冻金属剑
    event.create("rainbow:frostium_sword","sword")
    .maxDamage(522)
    .attackDamageBonus(3)
    .maxStackSize(11)
    .tooltip("给敌人霜冻buff")
    .tooltip("对水中生物和抗火生物1.5倍伤害")
    .tooltip("对着火生物额外增伤")
    //霜冻金属镐
    event.create("rainbow:frostium_pickaxe","pickaxe")
    .maxDamage(1500)
    .maxStackSize(1)
    .tooltip("黑曜石挖掘更快")
    .tag("minecraft:pickaxes")
    .tier(JSTier("DIAMOND"))
    //黏液棒
    event.create("rainbow:slime_rod","sword").unstackable().glow(true).attackDamageBonus(0.0).attackDamageBaseline(0.0)
    .tooltip("右键：生成救生平台")
    .tooltip("潜行右键：生成救生罩")
    .tooltip("左键：脱下实体装备")
    //提尔锋
    event.create("rainbow:tyring","sword").unstackable().attackDamageBonus(3.0).attackDamageBaseline(0.0).maxDamage(511)
    .tooltip("对有护甲的敌人造成额外伤害")
    //重锤
    event.create("rainbow:heavy_axe","axe").unstackable().attackDamageBonus(3.0).attackDamageBaseline(0.0).maxDamage(501)
    .tooltip("根据你的下落加速度造成伤害")
    //饕餮之锅
    event.create("rainbow:eldritch_pan","sword")
    .speedBaseline(-3.1)
    .attackDamageBonus(4.0)
    .rarity("epic")
    //超精密构件
    event.create("rainbow:super_mechanism","basic")
    .tooltip("高级合成材料")
    //屎
    event.create("rainbow:shit","basic").food(foodBuilder=>{foodBuilder.meat().hunger(-1).saturation(2.0).alwaysEdible().fastToEat().effect("minecraft:nausea",300,5,0.99)})
        .tooltip("食用关闭游戏(吃晕了")
    //七彩石
    event.create("rainbow:rainbow_stone","basic")
    //机关钥匙
    event.create("rainbow:core_key","basic")
    //甲虫钥匙
    event.create("rainbow:brood_eetle_key","basic")
    //奇迹物质
    event.create("rainbow:miracle","basic")
    //咒刃
    event.create("rainbow:vengeance_sword","sword")
    .tooltip("根据统计数据的死亡次数决定伤害（WIP）")
    //棒球棍
    event.create("rainbow:baseball_bat","sword")
    .useAnimation('bow')
    .useDuration(itemstack => 40)
    .use((level, player, hand) => true)
    .finishUsing((itemstack, level, entity) => {
        let TIME = 80;
        // 添加药水效果
        entity.potionEffects.add("rainbow:power_sword", TIME, 0, false, false);
        itemstack.nbt.poweroff = 1;
        level.server.scheduleInTicks(TIME, () => {
            itemstack.nbt.poweroff = 0;
        })
        level.server.runCommandSilent(`/playsound cataclysm:emp_activated voice @p ${entity.x} ${entity.y} ${entity.z}`)
        // 返回修改后的物品堆栈（而不是null）
        return itemstack;
    })
    //泰拉刃
    event.create("rainbow:terasword","sword")
    /*.useAnimation('bow')
    .useDuration(itemstack => 40)
    .use((level, player, hand) => true)
    .finishUsing((itemstack, level, entity) => {
    })
    .releaseUsing((itemstack, level,entity, tick) => {
    })*/
    /**
     * 当物品未完成useDuration的时间刻就被释放后的行为
     * tick为距离完整的使用刻还有多少刻
     */
//冲刺逻辑
/*    .releaseUsing((itemstack, level, entity, tick) => {
            const far = 1-(tick/100);
            const lookVec = entity.getLookAngle();
            const speed = 3; // 较慢的持续速度
            entity.deltaMovement = new Vec3d(
                lookVec.x()*far,
                lookVec.y()*far,
                lookVec.z()*far
              ).scale(speed);
            entity.hurtMarked = true;
    })*/
    //逻辑数字
    const Numbers = ['zero','one','two','three','four','five','six','seven','eight','nine','plus','minus','multiply','divide','missingno']
    Numbers.forEach(id=>{
        event.create(`rainbow:${id}`,"basic").displayName(`逻辑 ${ItemToNumberF(id)}`)
    })
})
//实体注册
StartupEvents.registry('entity_type', event => {
    event.create('rainbow:frost_arrow', 'entityjs:arrow')

        /**
         * One-Off values set at the startup of the game.
         */

        .setKnockback(5) // 击退
        .setBaseDamage(1) // 伤害
        .clientTrackingRange(8) // Set client tracking range to 8
        .isAttackable(true) // Make the arrow attackable
        .sized(1, 1) // Set size of arrow entity to 1x1
        .updateInterval(3) // Set update interval to 3 ticks
        //Setting .noItem() here will result in the builder skipping the item build altogether
        //Since the builder registers the item automatically this is the only way to prevent an item from being created here.
        //.noItem()
        .defaultHitGroundSoundEvent("minecraft:entity.arrow.hit") // Set default hit ground sound event
        .setWaterInertia(1) // Set water inertia to 1
        .mobCategory('misc') // Set mob category to 'misc'
        .item(item => {
            item.maxStackSize(64); // Set maximum stack size of arrow item to 64
        })
/*        .setDamageFunction(entity => {
            // Custom damage function based off the arrow entity
            return true;
        })*/
        .shouldRenderAtSqrDistance(context => {
            const { entity, distanceToPlayer } = context;
            // Custom logic to determine if the arrow should render based on distance, for example, rendering only if distance is less than 100 blocks
            return distanceToPlayer < 100;
        })
        .tryPickup(context => {
            // Custom logic to determine if a player can pick up the arrow, for example, allowing only non-creative mode players to pick it up
            return !context.player.isCreative();
        })
        .playerTouch(context => {
            const { player, entity } = context;
            // Custom behavior when a player touches the arrow, for example, giving the player the arrow
            if (!entity.getLevel().isClientSide() && (entity.onGround() || entity.noPhysics) && entity.shakeTime <= 0) {
                player.take(entity, 1);
                entity.discard();
            }
        })
        .tick(entity => {
            // Custom tick logic, for example, checking if the arrow is in lava and setting it on fire
            if (entity.getLevel().getBlockState(entity.blockPosition()).getBlock().id == "minecraft:lava") {
                entity.setSecondsOnFire(5);
            }
        })
        .textureLocation(entity => {
            //Change texture resource location depending on certain information about the arrow entity.
            //Accepts both a new ResourceLocation or a String representation.
            //new ResourceLocation("kubejs:textures/entity/projectiles/arrow.png")
            return "rainbow:textures/entity/frost_arrow.png"
        })

            event.create('rainbow:tnt_arrow', 'entityjs:arrow')
                .setKnockback(2)
                .setBaseDamage(4)
                .clientTrackingRange(8)
                .isAttackable(true)
                .sized(1, 1)
                .updateInterval(3)
                .defaultHitGroundSoundEvent("minecraft:entity.arrow.hit")
                .setWaterInertia(1)
                .mobCategory('misc')
                .item(item => {
                    item.maxStackSize(64);
                })
                .textureLocation(() => "rainbow:textures/entity/tnt_arrow.png")
        
                // 触碰生物时启动延迟爆炸
                .onHitEntity(context => {
                    const { entity } = context;
                    const level = entity.getLevel();
                    const server = entity.getServer();
        
                    if (level.isClientSide()) return;
                    server.scheduleInTicks(40, () => { 
                    level.createExplosion(entity.x, entity.y - 1, entity.z)
                    .causesFire(false)
                    .exploder(entity)
                    .explosionMode("none")
                    .strength(3)
                    .explode();
                    })
                    //entity.discard()
                })
        
                // 触碰方块时启动延迟爆炸
                .onHitBlock(context => {
                    const { entity } = context;
                    const level = entity.getLevel();
                    const server = entity.getServer();
        
                    if (level.isClientSide()) return;
                    server.scheduleInTicks(40, () => { 
                    level.createExplosion(entity.x, entity.y - 1, entity.z)
                    .causesFire(false)
                    .exploder(entity)
                    .explosionMode("none")
                    .strength(3)
                    .explode();
                    })
                })
                .displayName("延迟TNT箭")
                // 玩家触碰箭时（可选：阻止被捡起）
                .playerTouch(context => {
                    const { player, entity } = context;
                    // 可选地阻止玩家捡起
                    // player.sendSystemMessage("这支箭即将爆炸！");
        });

        event.create('rainbow:trea', 'entityjs:arrow')
                .setKnockback(2)
                .setBaseDamage(4)
                .clientTrackingRange(8)
                .isAttackable(true)
                .sized(1, 1)
                .updateInterval(3)
                .defaultHitGroundSoundEvent("minecraft:entity.arrow.hit")
                .setWaterInertia(1)
                .mobCategory('misc')
                .item(item => {
                    item.maxStackSize(64);
                })
                .textureLocation(() => "rainbow:textures/entity/trea.png")
                .playerTouch(context => {})
                .displayName("泰拉弹幕")
        event.create('rainbow:toxic_arrow', 'entityjs:arrow')
        .setKnockback(2)
        .setBaseDamage(4)
        .clientTrackingRange(8)
        .isAttackable(true)
        .sized(1, 1)
        .updateInterval(3)
        .defaultHitGroundSoundEvent("minecraft:entity.arrow.hit")
        .setWaterInertia(1)
        .mobCategory('misc')
        .item(item => {
            item.maxStackSize(64);
        })
        .textureLocation(() => "rainbow:textures/entity/toxic_arrow.png")
        .playerTouch(context => {})
        .displayName("滞留药水箭")
        
});

// 加载必要的Java类（用于原版战利品系统）
let $LootParams = Java.loadClass('net.minecraft.world.level.storage.loot.LootParams$Builder');
let $LootContextParamSets = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParamSets');
let $Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks');

StartupEvents.registry("block", event => {
    event.create("rainbow:docker").woodSoundType()
    .displayName("Docker(钓鱼型)")
    .blockEntity((entityInfo) => {
        entityInfo.inventory(9, 1); // 9格容器
        entityInfo.rightClickOpensInventory();
        
        // 每20 ticks（1秒）调用一次战利品表
        entityInfo.serverTick(20, 0, (entity) => {

            let pos = entity.blockPos.above(); // 上方方块坐标
            let blockAbove = entity.level.getBlockState(pos).getBlock();

            let blockId = blockAbove.id.toString();
            //minecraft:lava
if(blockId === "minecraft:water" || blockId === "minecraft:lava")
{

        let lootTable = entity.level.getServer().getLootData().getLootTable(blockId === "minecraft:water"?"minecraft:gameplay/fishing":"netherdepthsupgrade:gameplay/nether_fishing");
        let lootParams = new $LootParams(entity.level).create($LootContextParamSets.EMPTY);
        let lootItems = lootTable.getRandomItems(lootParams);

        lootItems.forEach(item => {
            entity.inventory.insertItem(item, false); // false表示不模拟
        });
}
        });
        
        // 红石交互（保持不变）
        entityInfo.attachCapability(
            CapabilityBuilder.ITEM.blockEntity()
                .availableOn((be, dir) => dir != Direction.up)
                .extractItem((be, slot, amount, simulate) => be.inventory.extractItem(slot, amount, simulate))
                .insertItem((be, slot, stack, simulate) => be.inventory.insertItem(slot, stack, simulate))
                .getSlotLimit((be, slot) => be.inventory.getSlotLimit(slot))
                .getSlots(be => be.inventory.slots)
                .getStackInSlot((be, slot) => be.inventory.getStackInSlot(slot))
                .isItemValid((be, slot, stack) => be.inventory.isItemValid(slot, stack))
        );
    });
});

//分析单片眼镜
StartupEvents.registry('item', event => {

    event

        .create('rainbow:lens')

        .maxStackSize(1)

        .tag("curios:head")

        .attachCapability(CuriosCapabilityBuilder.CURIOS.itemStack()
        .modifyAttribute("minecraft:generic.attack_damage", "attack_damage", 0.2, "multiply_total")
        )

        .rarity("epic")

        .displayName("分析单片眼镜")

    })

//掉落物分析眼镜
StartupEvents.registry('minecraft:item', event => {

    event

        .create('rainbow:advancement_lens')

        .maxStackSize(1)

        .tag("curios:head")

        .rarity("epic")

        .tooltip("佩戴后杀死生物有特殊掉落物，抢夺三")

        .displayName("掉落物分析眼镜")

        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
            .modifyFortuneLevel((slotContext, lootContext, stack) => 3)
        )
    })

//小仙人掌饰品
StartupEvents.registry('minecraft:item', event => {

    event

        .create('rainbow:cactus')

        .maxStackSize(1)

        .tag("curios:charm")

        .rarity("epic")

        .tooltip("每个30s为你恢复1饥饿值")

        .displayName("小仙人掌饰品")

        .attachCuriosCapability(
            CuriosJSCapabilityBuilder.create()
            .curioTick((slotContext, stack) => {
                const entity = slotContext.entity();
                const nbt = entity.getNbt(); // 获取当前NBT数据
                const hunger = nbt.getInt("foodLevel"); // 当前饥饿值
                
                // 每20刻（1秒）恢复1点饥饿值（不超过上限20）
                if (entity.age % SecoundToTick(30) === 0 && hunger < 20) {
                    nbt.putInt("foodLevel", hunger + 1); // 修改饥饿值
                    entity.setNbt(nbt); // 应用修改后的NBT
                }
            })
        )
    })

//新建文件夹
StartupEvents.registry('item', event => {
    event.create('rainbow:newfile')
    .tooltip("万物的起源")
    .displayName("新建文件夹")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:back")
})

//屠夫之钉
StartupEvents.registry('item', event => {
    event.create('rainbow:nail')
    .tooltip("攻击生物概率恢复冷却")
    .displayName("屠夫之钉")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
})

//闪电瓶子
StartupEvents.registry('item', event => {
    event.create('rainbow:lightning')
    .tooltip("攻击生物连锁闪电")
    .displayName("闪电瓶子")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
})

//心灵钻石
StartupEvents.registry('item', event => {
    event.create('rainbow:mind')
    .tooltip("主动技能释放心灵护盾")
    .displayName("心灵钻石")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
})

StartupEvents.registry('item', event => {
    event.create('rainbow:hungry_charm')
    .tooltip([
        "§6佩戴后会依据当下的饥饿值提供增益",
        "§a-----------------------------",
        "§e当饥饿值为12点时：",
        "§7+10% 攻击伤害",
        "§7+10% 移动速度", // 修正：原tooltip写"攻击速度"但代码是"movement_speed"
        "§7+5 盔甲韧性",
        "§a-----------------------------",
        "§c饥饿值每与12点相差1点，",
        "§c会使增益效果减少10%",
        "§4当饥饿值处于2点以下后增益为0"
    ].join('\n'))
    .displayName("§d自律之符")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .curioTick((slotContext, stack) => {
            const entity = slotContext.entity();
            const hungry = entity.getFoodData().getFoodLevel();
            let multiplier = 0;
    
            if (hungry >= 12) {
                multiplier = 1.0;
            } else if (hungry <= 2) {
                multiplier = 0.0;
            } else {
                multiplier = (hungry - 2) * 0.1;
            }
    
            entity.modifyAttribute("generic.attack_damage", "hungry_charm_damage", 0.1 * multiplier, "multiply_total");
            entity.modifyAttribute("generic.movement_speed", "hungry_charm_speed", 0.1 * multiplier, "multiply_total");
            entity.modifyAttribute("generic.armor_toughness", "hungry_charm_toughness", 5 * multiplier, "addition");
        })
        .onUnequip((slotContext, stack) => {
            const entity = slotContext.entity();
            entity.removeAttribute("generic.attack_damage", "hungry_charm_damage");
            entity.removeAttribute("generic.movement_speed", "hungry_charm_speed");
            entity.removeAttribute("generic.armor_toughness", "hungry_charm_toughness");
        })
    )
})


//金猪吊坠
StartupEvents.registry('item', event => {
    event.create('rainbow:golden_piggy_charm')
    .tooltip("猪灵不会攻击你")
    .displayName("金猪吊坠")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .makesPiglinsNeutral((slotContext, stack) => true)
    )
})

//武器大师勋章
StartupEvents.registry('item', event => {
    event.create('rainbow:weapon_master_charm')
    .tooltip([
        "§6武器大师勋章 §e[史诗]",
        "§a-----------------------------",
        "§b基础效果：",
        "§f+10% 攻击伤害（常驻）",
        "§a-----------------------------",
        "§b攻速触发效果：",
        "§7当攻击速度 < §c1.5§7 时：",
        "§f+50% 护甲穿透（乘算基础值）",
        "§7当攻击速度 > §a1.75§7 时：",
        "§f+3 基础伤害（直接加成）",
        "§a-----------------------------",
        "§8※ 需主手持有武器时生效"
    ].join('\n'))
    .displayName("§d武器大师勋章")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .curioTick((slotContext, stack) => {
            const entity = slotContext.entity();
            const attackspeed = entity.getAttribute("generic.attack_speed");
            const mainhand = entity.getItemInHand("main_hand");

            if(attackspeed < 1.5 && mainhand.id != "minecraft:air") {
                entity.modifyAttribute(
                    "attributeslib:armor_pierce",
                    "weapon_master_charm_pierce",
                    1.5,
                    "multiply_base"
                );
            } 
            else if(attackspeed > 1.75 && mainhand.id != "minecraft:air") {
                entity.modifyAttribute(
                    "generic.attack_damage",
                    "weapon_master_charm_bonus",
                    3,
                    "addition"
                );
            }
        })
        .onUnequip((slotContext, stack) => {
            const entity = slotContext.entity();
            entity.removeAttribute("attributeslib:armor_pierce", "weapon_master_charm_pierce");
            entity.removeAttribute("generic.attack_damage", "weapon_master_charm_bonus");
        })
        .onEquip((slotContext, stack) => {
            const entity = slotContext.entity();
            entity.modifyAttribute(
                "generic.attack_damage",
                "weapon_master_charm_base",
                1.1,
                "multiply_total"
            );
        })
    )
})

//疾风
StartupEvents.registry('item', event => {
    event.create('rainbow:wind')
    .tooltip("获取灵魂汲取和无拘步履buff")
    .displayName("疾风")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .curioTick((slotContext, stack) => {
            const player = slotContext.entity();

            if(!player.age%SecoundToTick(5)) return;

            player.potionEffects.add("alexsmobs:soulsteal",SecoundToTick(10),0,false,false);
            player.potionEffects.add("netherexp:unbounded_speed",SecoundToTick(10),0,false,false);
        })
    )
})

//墨镜
StartupEvents.registry('item', event => {
    event.create('rainbow:sunglasses')
    .tooltip("不激怒末影人")
    .displayName("墨镜")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:head")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .isEnderMask((slotContext, enderMan, stack) => true)
    )
})

//幸运符文
StartupEvents.registry('item', event => {
    event.create('rainbow:lucky_charm')
    .tooltip("获得幸运，时运3")
    .displayName("幸运符文")
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .modifyFortuneLevel((slotContext, lootContext, stack) => 3)
        .curioTick((slotContext)=>{
            const player = slotContext.entity();
            if(!player.age%20) return;
            player.potionEffects.add("minecraft:luck",60,1,false,false)
        })
    )
})

//血战沙场之证
StartupEvents.registry('item', event => {
    event.create('rainbow:berserk_emblem')
    .displayName("血战沙场之证")
    .tooltip([
        "§6血战沙场之证 §e[史诗]",
        "§a-----------------------------",
        "§b基础效果：",
        "§d+1% 攻击伤害",
        "§d+1% 攻击速度",
        "§d+0.5% 移动速度",
        "§d+0.5% 护甲韧性",
        "§a-----------------------------",
        "§8※ 生命值越低，加成效果越强"
    ].join('\n'))
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .curioTick((slotContext, stack) => {
            const player = slotContext.entity();
            const playerMaxHP = player.getMaxHealth();
            const playerHP = player.getHealth();
            const percentage = 1 - playerHP/playerMaxHP;
            

            player.modifyAttribute("generic.attack_damage","berserk_emblem",1.0+percentage,"multiply_total")
            player.modifyAttribute("generic.attack_speed","berserk_emblem",1.0+percentage,"multiply_total")
            player.modifyAttribute("generic.movement_speed","berserk_emblem",1.0+percentage/2.0,"multiply_total")
            player.modifyAttribute("generic.armor_toughness","berserk_emblem",1.0+percentage/2.0,"multiply_total")
        })
        .onUnequip((slotContext, stack) => {
            const entity = slotContext.entity();
            entity.removeAttribute("generic.attack_damage", "berserk_emblem");
            entity.removeAttribute("generic.attack_speed", "berserk_emblem");
            entity.removeAttribute("generic.movement_speed", "berserk_emblem");
            entity.removeAttribute("generic.armor_toughness", "berserk_emblem");
        })
    )
})

//猎宝者护符
StartupEvents.registry('item', event => {
    event.create('rainbow:mining_charm')
    .displayName("猎宝者护符")
    .tooltip([
        "§6猎宝者护符 §e[史诗]",
        "§a-----------------------------",
        "§b基础效果：",
        "§d+1 时运等级",
        "§d+2.15 触及距离",
        "§d+1 幸运",
        "§a-----------------------------",
    ].join('\n'))
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .modifyFortuneLevel((slotContext, lootContext, stack) => 1)
        .onEquip((slotContext, stack) => {
            const player = slotContext.entity();
            player.modifyAttribute("forge:entity_reach","mining_charm",2.15,"addition")
            player.modifyAttribute("minecraft:generic.luck","mining_charm",1,"addition")
            player.modifyAttribute("attributeslib:draw_speed","mining_charm",1.3,"multiply_base")
        })
        .onUnequip((slotContext, stack) => {
            const entity = slotContext.entity();
            entity.removeAttribute("forge:entity_reach", "mining_charm");
            entity.removeAttribute("minecraft:generic.luck", "mining_charm");
            entity.removeAttribute("attributeslib:draw_speed", "mining_charm");
        })
    )
})

//怪物猎人勋章
StartupEvents.registry('item', event => {
    event.create('rainbow:monster_charm')
    .displayName("怪物猎人勋章")
    .tooltip([
        "§6怪物猎人勋章 §e[史诗]",
        "§a-----------------------------",
        "§b基础效果：",
        "§f定期获取伤害吸收buff",
        "§f击杀怪物获得短时间力量效果",
        "§d 对BOSS生物有额外伤害（WIP）",
        "§a-----------------------------",
    ].join('\n'))
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
    .attachCuriosCapability(
        CuriosJSCapabilityBuilder.create()
        .curioTick((slotContext, stack) => {
            const player = slotContext.entity();
            if(player.age%SecoundToTick(10)) return;

            player.potionEffects.add("absorption",SecoundToTick(5),1,false,false)
        })
    )
})

//曙旼始灵
StartupEvents.registry('item', event => {
    event.create('rainbow:daawnlight_spirit_origin')
    .displayName("曙旼始灵")
    .tooltip([
        "§6曙旼始灵 §e[史诗]",
        "§a-----------------------------",
        "§b基础效果：",
        "§f每10s标记周围实体，被标记实体受到远程伤害翻倍",
        "§a-----------------------------",
    ].join('\n'))
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
})

//赌徒骰子
StartupEvents.registry('item', event => {
    event.create('rainbow:dice')
    .displayName("赌徒骰子")
    .tooltip([
        "§6赌徒骰子 §e[史诗]",
        "§a-----------------------------",
        "§b基础效果：",
        "§f击杀生物概率刷新主手和副手物品冷却",
        "§f触发概率根据幸运值判断",
        "§a-----------------------------",
    ].join('\n'))
    .rarity("epic")
    .maxStackSize(1)
    .tag("curios:charm")
})
