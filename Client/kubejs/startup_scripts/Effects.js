// priority: 1000
const $EffectClass = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')

StartupEvents.registry("potion", event => {
    //不祥之瓶
    //event.create("omen").addEffect($EffectClass("bad_omen",60));
});

StartupEvents.registry("mob_effect", event => {
    event.create("rainbow:democratic_save")
        .beneficial() // 标记为有益效果
        .color(0xFFFF00) // 设置颜色为黄色
    event.create("rainbow:temporal_sadness")
    .harmful()
    .color(0xFFFFFF)
    .effectTick(event=>{
        event.potionEffects.add("minecraft:weakness",20,1,false,false)
        event.potionEffects.add("minecraft:slowness",20,1,false,false)
        event.setSprinting(false)
    })
    event.create("rainbow:tag")
    .harmful()
    .color(0xFF0000)
    event.create("rainbow:manba")
    .beneficial() // 标记为有益效果
    .color(0xEAF044)
    event.create('rainbow:taunt_effect')
    .harmful()
        .effectTick((mob, lvl) => {
        global.TauntEffectEvent(mob, lvl)
        })
    event.create("rainbow:power_sword")
    .beneficial() // 标记为有益效果
    .color(0xEAF044)
});