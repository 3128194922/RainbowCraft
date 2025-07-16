// priority: 500
//玩家统一受伤事件
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingHurtEvent", event => {
        let victim = event.entity;
        let attacker = event.source.player;
        let source = event.getSource();
        let range_damage = ['atmospheric.passionFruitSeed','thrown','soulBullet','arrow','trident','lead_bolt','create.potato_cannon'];

        // 统一过滤条件
        if (!attacker || !attacker.isPlayer()) return;
        if (attacker.level.isClientSide()) return;
    
        let mainHand = attacker.getItemInHand("main_hand");
        let offHand = attacker.getItemInHand("off_hand");

        //动力剑
        if(attacker.hasEffect("rainbow:power_sword") && mainHand.id == "rainbow:baseball_bat")
                {
                        event.setAmount(40)
                        attacker.server.runCommandSilent(`/playsound cataclysm:emp_activated voice @p ${victim.x} ${victim.y} ${victim.z}`)
                }

//武器/////////////////////////////////////////////////////////////////
        // 提尔锋伤害逻辑
        if (mainHand.id == "rainbow:tyring" && range_damage.indexOf(source.getType()) == -1) {
            event.setAmount(event.getAmount() + event.getAmount() * victim.getArmorValue());
        } 
        
        // 重锤伤害逻辑
        if (mainHand.id == "rainbow:heavy_axe" && range_damage.indexOf(source.getType()) == -1) {
            event.setAmount(event.getAmount() + ((Math.abs(attacker.getDeltaMovement().y()).toFixed(1) - 0.1) * 40));
            attacker.fallDistance = 0; // 重置跌落高度
        }

        // 霜冻剑伤害逻辑
        if (mainHand.id == "rainbow:frostium_sword"  && range_damage.indexOf(source.getType()) == -1) {
                victim.setTicksFrozen(SecoundToTick(15));
            if (victim.isWaterCreature() || victim.fireImmune() || victim.getType() == "minecraft:enderman" || victim.isOnFire()) {
                event.setAmount(event.getAmount() * 1.5);
            }
        }

        // 霜冻斧头伤害逻辑优化版
        if (mainHand.id === "rainbow:frostium_axe"  && range_damage.indexOf(source.getType()) == -1) {
                let damageMultiplier = 1.0;
                let bonusFireDamage = 0.0;
                
                // 冰冻目标增伤
                if (victim.getTicksFrozen() > 0) {
                damageMultiplier = 1.5;
                }
                
                // 燃烧目标额外伤害
                if (victim.isOnFire()) {
                bonusFireDamage = 3;
                victim.setSecondsOnFire(0); // 熄灭火焰
                }
                
                // 计算最终伤害
                event.setAmount(event.getAmount() * damageMultiplier + bonusFireDamage);
        }

        // 盈泪之剑
        if (mainHand.id == "rainbow:teardrop_sword" && range_damage.indexOf(source.getType()) == -1 || (offHand.id == "rainbow:teardrop_sword" && mainHand.id == "rainbow:frostium_sword")) {
            victim.setSecondsOnFire(15);
            if(randomBool(0.33))
                {
                        victim.potionEffects.add("rainbow:temporal_sadness",SecoundToTick(5),0,true,true)
                }
        }

        //屠夫之钉
        if(hasCurios(attacker,"rainbow:nail") && range_damage.indexOf(source.getType()) != -1)
                {
                        if(randomBool(attacker.getAttribute("generic.luck").getValue()/10.0))
                                {
                                        attacker.level.createExplosion(victim.x,victim.y+1,victim.z)
                                        .causesFire(false)
                                        .exploder(attacker)
                                        .explosionMode("none")
                                        .strength(0)
                                        .explode();

                                        attacker.cooldowns.removeCooldown(attacker.getItemInHand("off_hand").id);
                                }
                }
        if(mainHand.id == "rainbow:eldritch_pan")
                {
                        attacker.server.runCommandSilent(`/playsound farmersdelight:item.skillet.attack.strong voice @p ${attacker.x} ${attacker.y} ${attacker.z}` )
                }
        if(mainHand.id == "rainbow:duel")
            {
                if(mainHand.nbt.type == victim.getType())
                    {
                        event.setAmount(event.getAmount()*1.5)
                    }
                else
                {
                    mainHand.nbt.type = victim.getType();
                }
            }
        // 攻击逻辑 - 链式闪电效果
        if (hasCurios(attacker, "rainbow:lightning")) {

            // 计算闪电链参数
            const chainsLeft = 5; // 基础3次 + 每级附加3次
            const creatorId = attacker.getId();
            const targetId = victim.getId();
            
            // 生成闪电链实体
            const lightning = attacker.level.createEntity('domesticationinnovation:chain_lightning');
            lightning.setCreatorEntityID(creatorId);
            lightning.setFromEntityID(creatorId);
            lightning.setToEntityID(targetId);
            lightning.setChainsLeft(chainsLeft);
            victim.level.addFreshEntity(lightning);
            attacker.server.runCommandSilent(`/playsound domesticationinnovation:chain_lightning voice @p ${attacker.x} ${attacker.y} ${attacker.z}`)
        }
        //防御逻辑/////////////////////////////////////////////////////////////
        //曙旼始灵
        if(victim.hasEffect("rainbow:tag") && range_damage.indexOf(source.getType()) != -1)
                {
                        event.setAmount(event.getAmount()*2)
                }
    });
//抛射体事件
ForgeEvents.onEvent("net.minecraftforge.event.entity.ProjectileImpactEvent", event => {
})
//玩家破坏方块事件
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.PlayerEvent$BreakSpeed", event => {
let block = event.state.getBlock();
let entity = event.getEntity()

// 检测黑曜石和特定镐子
if (block.id === "minecraft:obsidian" && (entity.getItemInHand("main_hand").id === "rainbow:frostium_pickaxe" || entity.getItemInHand("off_hand").id === "rainbow:frostium_pickaxe")) {
        // 修改破坏速度（原始值×16）
        event.newSpeed = event.originalSpeed * 16;
        
        // 调试输出（可选）
        //console.log(`[挖掘加速] 玩家 ${event.player.name} 使用冰霜镐破坏黑曜石，新速度=${event.newSpeed}`);
}
});
//玩家攻击事件
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.AttackEntityEvent", event => {
        let entity = event.getEntity();
        let target = event.getTarget();
        let Integer = Java.loadClass("java.lang.Integer");
        if(entity.level.clientSide) return;

        if(entity.getType() != null && target.getType() != null)
                {
                        if(entity.getItemInHand("main_hand") === 'rainbow:terasword')
                        {
                                if(!entity.getItemInHand("main_hand").nbt.power)
                                        {
                                                entity.getItemInHand("main_hand").nbt.power = 1;
                                        }
                                else
                                {
                                        if(entity.getItemInHand("main_hand").nbt.power<4)
                                                {
                                                        entity.getItemInHand("main_hand").nbt.power = entity.getItemInHand("main_hand").nbt.power + 1;
                                                }
                                        else
                                        {
                                                return;
                                        }
                                }
                        }

                        if(entity.getItemInHand("main_hand") === 'rainbow:duel')
                                {
                                    if(!entity.getItemInHand("main_hand").nbt.type)
                                        {
                                            entity.getItemInHand("main_hand").nbt.type = none;
                                        }
                                }
                }
});
//玩家右键生物事件
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract", event => {
        let Player = event.getEntity();
        let Item = event.getItemStack();
        let Entity = event.getTarget();
        
        if(Player.isPlayer() && Player.isShiftKeyDown() && Item.getId()=="minecraft:shears" && Entity.getType() == "minecraft:creeper")
                {
                        Entity.block.popItem("rainbow:greenblock")
                }
});
/*
//tag武器
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingAttackEvent",event=>{
        let player = event.source.player;
        let monster = event.entity;

        //if(attacker.level.isClientSide()) return;
        if(hasCurio(player,"rainbow:advancement_lens"))
                {
                        
                        //monster.addTag("rainbow:boss");
                        //console.log(monster.nbt.MobEnchantData.StoredMobEnchants);
                }


})
*/

/*
//玩不动，先放着，现在的效果是民主保佑处死非玩家单位
// 监听 MobEffectEvent.Expired 事件（自定义效果结束）
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.MobEffectEvent$Expired", event => {
        let player = event.entity;
        // 获取效果实例
        let effectInstance = event.getEffectInstance();
        // 检查是否是 rainbow:democratic_save 效果
        let effectId = effectInstance.getEffect().getDescriptionId();

        if(player.level.isClientSide()) return;
        if(effectId === "effect.rainbow.democratic_save")
                {
                        player.kill();
                }
    });
*/
/*
// 堕落之心
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent", event => {
        heatCurios(event);
});
// 堕落之心
ForgeEvents.onEvent("top.theillusivec4.curios.api.event.CurioChangeEvent", event => {
        heatCurios(event);
});*/
/*
let { entity,from,to } = event; 
if(!entity.isPlayer()) return;
// 获取玩家的 Curios 物品栏
let curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
let curiosInventory = curiosApi.getCuriosInventory(entity).resolve().get();
//获取栏位4的物品ID(栏位从0开始，从左到右)
if(curiosInventory.getEquippedCurios().getStackInSlot(4).getId() === "fromtheshadows:corrupted_heart" && entity.getArmorValue() < 10)
{
entity.potionEffects.add("minecraft:regeneration", -1, 5, false, false);
}
else
{
entity.removeEffect("minecraft:regeneration");
}*/
// 虚空炼成系统：物品掉入虚空后转化为指定产物
ForgeEvents.onEvent("net.minecraftforge.event.entity.EntityLeaveLevelEvent", (event) => {
        let { entity, level } = event;
        if (level.clientSide || !entity.item || entity.getY() > level.getMinBuildHeight()) return;
    
        let inputItemId = entity.item.id;
        let inputCount = entity.item.count;
    
        // 配方列表：输入 → 输出
        let voidTransmuteRecipes = {
            'rainbow:raw_voidore': 'createutilities:void_steel_ingot'
        };
    
        // 检查是否有对应配方
        let outputItemId = voidTransmuteRecipes[inputItemId];
        if (!outputItemId) return;
    
        // 创建转化后的掉落物实体，数量对应
        let resultEntity = entity.block.createEntity("item");
        resultEntity.item = Item.of(outputItemId, inputCount);  // 👈 保留原始数量
        resultEntity.y = level.getMinBuildHeight() - 20;
    
        // 设置运动效果
        let riseSpeed = (entity.fallDistance - 43) / 50;
        resultEntity.setDeltaMovement(new Vec3d(0, riseSpeed, 0));
        resultEntity.setNoGravity(true);
        resultEntity.setGlowing(true);
    
        resultEntity.spawn();
    });
    
    
// 监听左键空击事件
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$LeftClickEmpty', event => {
/*        let player = event.entity;

        if (!player || !player.level.clientSide) return;

        let projectileName = "minecraft:arrow";
        
        if(player.mainHandItem.id =="rainbow:terasword")
                {
                        projectileName = "minecraft:arrow";
                }
            // 计算发射数据
            let viewVector = player.getViewVector(1.0)
            let length = Math.sqrt(viewVector.x() * viewVector.x() + viewVector.y() * viewVector.y() + viewVector.z() * viewVector.z())
            let nor_x = viewVector.x() / length
            let nor_y = viewVector.y() / length
            let nor_z = viewVector.z() / length
            let new_x = player.x + nor_x * 2
            let new_y = player.y + player.getEyeHeight()
            let new_z = player.z + nor_z * 2
            
            // 发送数据到服务端
            Client.player.sendData("projectlie", {
                x: new_x,
                y: new_y,
                z: new_z,
                viewX: nor_x,
                viewY: nor_y,
                viewZ: nor_z,
                name: projectileName
            })*/
    })