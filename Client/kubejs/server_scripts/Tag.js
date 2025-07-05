// priority: 500
ServerEvents.tags("item",event=>{
    event.add("curios:back",['create:copper_backtank','create:netherite_backtank','minecraft:tnt','oreganized:shrapnel_bomb','savage_and_ravage:spore_bomb','minecraft:end_rod'])
    event.add("minecraft:arrows",['rainbow:frost_arrow','oreganized:lead_bolt','rainbow:tnt_arrow'])
    event.add("curios:charm",['minecraft:recovery_compass'])
    event.add("rainbow:oldbook",['quark:ancient_tome']) 
    event.add("curios:head",['farmersdelight:skillet','rainbow:eldritch_pan','dungeonsdelight:golden_cleaver','farmersdelight:basket']) 
    event.add("rainbow:redbean",['neapolitan:adzuki_beans','youkaishomecoming:redbean']) 
})
ServerEvents.tags("block",event=>{
    event.add("create:chest_mounted_storage",['quark:acacia_chest', 'quark:jungle_chest', 'quark:birch_chest', 'quark:spruce_chest', 'quark:oak_chest', 'quark:blossom_chest', 'quark:azalea_chest', 'quark:ancient_chest', 'quark:prismarine_chest', 'quark:purpur_chest', 'quark:nether_brick_chest', 'quark:cherry_chest', 'quark:bamboo_chest', 'quark:mangrove_chest', 'quark:warped_chest', 'quark:crimson_chest', 'quark:dark_oak_chest', 'createutilities:void_chest'])
})
ServerEvents.tags('minecraft:biome', event => {
})