// priority: 500
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingHurtEvent", event => {
        const victim = event.entity;
        const attacker = event.source.player;
        const source = event.getSource();
        const range_damage = ['atmospheric.passionFruitSeed','thrown','soulBulconst','arrow','trident','lead_bolt','create.potato_cannon'];

        // 统一过滤条件
        if (!attacker || !attacker.isPlayer()) return;
        if (attacker.level.isClientSide()) return;
    
        const mainHand = attacker.getItemInHand("main_hand");
        const offHand = attacker.getItemInHand("off_hand");

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
                const damageMultiplier = 1.0;
                const bonusFireDamage = 0.0;
                
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
        //棒球棍
        if((mainHand.id == "rainbow:baseball_bat" && range_damage.indexOf(source.getType()) != -1) || (mainHand.id == "rainbow:baseball_bat" && source.getType() == "player"))
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
        //防御逻辑/////////////////////////////////////////////////////////////
        //曙旼始灵
        if(victim.hasEffect("rainbow:tag") && range_damage.indexOf(source.getType()) != -1)
                {
                        event.setAmount(event.getAmount()*2)
                }
    });
//玩家破坏方块事件
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.PlayerEvent$BreakSpeed", event => {
const block = event.state.getBlock();
const entity = event.getEntity()

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
});
//玩家右键生物事件
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.PlayerInteractEvent$EntityInteract", event => {
        const Player = event.getEntity();
        const Item = event.getItemStack();
        const Entity = event.getTarget();
        
        if(Player.isPlayer() && Player.isShiftKeyDown() && Item.getId()=="minecraft:shears" && Entity.getType() == "minecraft:creeper")
                {
                        Entity.block.popItem("rainbow:greenblock")
                }
});
/*
//tag武器
ForgeEvents.onEvent("net.minecraftforge.event.entity.living.LivingAttackEvent",event=>{
        const player = event.source.player;
        const monster = event.entity;

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
        const player = event.entity;
        // 获取效果实例
        const effectInstance = event.getEffectInstance();
        // 检查是否是 rainbow:democratic_save 效果
        const effectId = effectInstance.getEffect().getDescriptionId();

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
const { entity,from,to } = event; 
if(!entity.isPlayer()) return;
// 获取玩家的 Curios 物品栏
const curiosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
const curiosInventory = curiosApi.getCuriosInventory(entity).resolve().get();
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
        const { entity, level } = event;
        if (level.clientSide || !entity.item || entity.getY() > level.getMinBuildHeight()) return;
    
        const inputItemId = entity.item.id;
        const inputCount = entity.item.count;
    
        // 配方列表：输入 → 输出
        const voidTransmuteRecipes = {
            'rainbow:raw_voidore': 'createutilities:void_steel_ingot'
        };
    
        // 检查是否有对应配方
        const outputItemId = voidTransmuteRecipes[inputItemId];
        if (!outputItemId) return;
    
        // 创建转化后的掉落物实体，数量对应
        const resultEntity = entity.block.createEntity("item");
        resultEntity.item = Item.of(outputItemId, inputCount);  // 👈 保留原始数量
        resultEntity.y = level.getMinBuildHeight() - 20;
    
        // 设置运动效果
        const riseSpeed = (entity.fallDistance - 43) / 50;
        resultEntity.setDeltaMovement(new Vec3d(0, riseSpeed, 0));
        resultEntity.setNoGravity(true);
        resultEntity.setGlowing(true);
    
        resultEntity.spawn();
    });
    
    
// 监听左键空击事件
ForgeEvents.onEvent('net.minecraftforge.event.entity.player.PlayerInteractEvent$LeftClickEmpty', event => {
        const player = event.entity;

        if (!player || !player.level.clientSide) return;

        const projectileName = "minecraft:arrow";
        
        if(player.mainHandItem.id =="rainbow:terasword")
                {
                        projectileName = "minecraft:arrow";
                }
            // 计算发射数据
            const viewVector = player.getViewVector(1.0)
            const length = Math.sqrt(viewVector.x() * viewVector.x() + viewVector.y() * viewVector.y() + viewVector.z() * viewVector.z())
            const nor_x = viewVector.x() / length
            const nor_y = viewVector.y() / length
            const nor_z = viewVector.z() / length
            const new_x = player.x + nor_x * 2
            const new_y = player.y + player.getEyeHeight()
            const new_z = player.z + nor_z * 2
            
            // 发送数据到服务端
            Client.player.sendData("projectlie", {
                x: new_x,
                y: new_y,
                z: new_z,
                viewX: nor_x,
                viewY: nor_y,
                viewZ: nor_z,
                name: projectileName
            })
    })