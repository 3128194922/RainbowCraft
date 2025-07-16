// priority: 0
//修改配方
ServerEvents.recipes(event=>{
    //删除金苹果
    event.remove({output:'minecraft:enchanted_golden_apple'})
    //永恒之门配方
    event.remove({output:Item.of('gateways:gate_pearl', '{gateway:"gateways:basic/blaze"}')})//删除输出为指定物品和NBT的配方
    event.remove({output:Item.of('gateways:gate_pearl', '{gateway:"gateways:basic/enderman"}')})
    event.remove({output:Item.of('gateways:gate_pearl', '{gateway:"gateways:basic/slime"}')})
    event.remove({output:Item.of('gateways:gate_pearl', '{gateway:"gateways:emerald_grove"}')})
    event.remove({output:Item.of('gateways:gate_pearl', '{gateway:"gateways:endless/blaze"}')})
    event.remove({output:Item.of('gateways:gate_pearl', '{gateway:"gateways:overworldian_nights"}')})
    event.remove({output:Item.of('gateways:gate_pearl', '{gateway:"gateways:hellish_fortress"}')})
    //CCK实验性物品配方
    event.remove({output:'environmental:cherry_pie'})//删除配方，通过物品ID
    event.remove({output:'environmental:truffle_pie'})
    //单元箱
    event.replaceInput({output:'backpack_pixel:unitbox'},'minecraft:iron_nugget','minecraft:shulker_box')
    //袋装红豆
    event.remove({id:'youkaishomecoming:redbean_bag'})
    //虚空矿
    event.remove({id:"createutilities:mixing/void_steel_ingot"})
    //音乐播放器
    event.remove({output:'netmusic:music_player'})
    event.shaped('netmusic:music_player',[
        ['#minecraft:planks','#minecraft:planks','#minecraft:planks'],
        ['#minecraft:planks','create:precision_mechanism','#minecraft:planks'],
        ['#minecraft:planks','create:precision_mechanism','#minecraft:planks'],
        ['#minecraft:planks','#minecraft:planks','#minecraft:planks']])
    event.remove({output:'netmusic:cd_burner'})
    event.shaped('netmusic:cd_burner',[
        ['#minecraft:planks','#minecraft:planks','#minecraft:planks'],
        ['#minecraft:planks','#forge:ingots/iron','#minecraft:planks'],
        ['#minecraft:planks','create:precision_mechanism','#minecraft:planks'],
        ['#minecraft:planks','#minecraft:planks','#minecraft:planks']])
    event.remove({output:'netmusic:computer'})
    event.shaped('netmusic:computer',[
        ['#minecraft:planks','#minecraft:planks','#minecraft:planks'],
        ['#minecraft:planks','#forge:ingots/gold','#minecraft:planks'],
        ['#minecraft:planks','create:precision_mechanism','#minecraft:planks'],
        ['#minecraft:planks','#minecraft:planks','#minecraft:planks']])
    //召唤祭坛
/*    event.shaped('summoningrituals:altar',[
        ['','minecraft:wither_skeleton_skull',''],
        ['#minecraft:candles','#minecraft:candles','#minecraft:candles'],
        ['minecraft:gold_ingot','minecraft:lectern','minecraft:gold_ingot']])
    event.shaped('summoningrituals:indestructible_altar',[
        ['','create:sturdy_sheet',''],
        ['create:sturdy_sheet','summoningrituals:altar','create:sturdy_sheet'],
        ['','create:sturdy_sheet',''],])*/
    //洋葱
    event.recipes.farmersdelight.cutting(
        'farmersdelight:onion',
        '#farmersdelight:tools/knives', // tool
        [ // results
        'overweight_farming:vegetable_peels',
        ],
        // '' // sound
    );
    //契约戒
    event.remove({output:'petconnect:pet_connect'})
    event.shaped('petconnect:pet_connect',[
        ["","waystones:warp_dust",""],
        ["waystones:warp_dust","oreganized:silver_mirror","create:sturdy_sheet"],
        ["","create:sturdy_sheet",""]
    ])
    //炽足兽蛋配方
    event.replaceInput({id: 'mynethersdelight:cutting/strider_egg'}, 
    Ingredient.of('#forge:tools/pickaxes'), 
    Ingredient.of('#minecraft:pickaxes'))
    //event.remove({output:'netmusic:music_player_backpack'})
    //飞机
    event.remove({output:'immersive_aircraft:boiler'})//删除配方，通过mod筛选
    event.shaped('immersive_aircraft:boiler',[
        ['minecraft:copper_ingot','minecraft:copper_ingot','minecraft:copper_ingot'],
        ['minecraft:copper_ingot','rainbow:super_mechanism','minecraft:copper_ingot'],
        ['minecraft:copper_ingot','minecraft:furnace','minecraft:copper_ingot']])
    //说明书配方
    event.shapeless(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:encyclopedia"}'),'minecraft:dirt')
    //传送石价格降低
    event.remove({output:Item.of('waystones:warp_stone', '{Damage:0}')})
    event.shapeless(Item.of('waystones:warp_stone', '{Damage:0}'),['minecraft:emerald','minecraft:ender_pearl'])
    //末影箱戒指
    event.shapeless("rainbow:enderring","minecraft:ender_chest")
    //泥土配方
    event.recipes.create.crushing('minecraft:dirt', 'minecraft:flint').processingTime(500)//.withChance(0.12)
    //命名牌配方
    event.shapeless('minecraft:name_tag',['#forge:string','#minecraft:planks','minecraft:name_tag']).keepIngredient({item:'minecraft:name_tag'})
    //药水箭配方
    event.shapeless("rainbow:toxic_arrow",['minecraft:stick', 'minecraft:feather','minecraft:lingering_potion']).modifyResult((inventory,itemStack)=>{
        if(inventory.find("lingering_potion").getNbt().get("Potion"))
            {
                return Item.of("rainbow:toxic_arrow",`{Potion:${inventory.find("lingering_potion").getNbt().get("Potion")}}`)
            }
            else
            {
                return Item.of("air")
            }
    })
    //切石机加强
    event.stonecutting('3x minecraft:iron_bars','minecraft:iron_door')
    event.stonecutting('create:cogwheel','create:large_cogwheel')
    event.stonecutting('create:water_wheel','create:large_water_wheel')
    event.stonecutting('create:shaft','create:cogwheel')
    //光源方块合成
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"1"}}'),'1x minecraft:torch').id('kubejs:light_1_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"2"}}'),'2x minecraft:torch').id('kubejs:light_2_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"3"}}'),'3x minecraft:torch').id('kubejs:light_3_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"4"}}'),'4x minecraft:torch').id('kubejs:light_4_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"5"}}'),'5x minecraft:torch').id('kubejs:light_5_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"6"}}'),'6x minecraft:torch').id('kubejs:light_6_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"7"}}'),'7x minecraft:torch').id('kubejs:light_7_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"8"}}'),'8x minecraft:torch').id('kubejs:light_8_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"9"}}'),'9x minecraft:torch').id('kubejs:light_9_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"10"}}'),'1x minecraft:lantern').id('kubejs:light_10_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"11"}}'),'2x minecraft:lantern').id('kubejs:light_11_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"12"}}'),'3x minecraft:lantern').id('kubejs:light_12_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"13"}}'),'4x minecraft:lantern').id('kubejs:light_13_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"14"}}'),'5x minecraft:lantern').id('kubejs:light_14_manual_only')
    event.shapeless(Item.of('minecraft:light', '{BlockStateTag:{level:"15"}}'),'6x minecraft:lantern').id('kubejs:light_15_manual_only')
    //量天尺配方
    event.shapeless('atmospheric:dragon_roots',['atmospheric:dragon_fruit','minecraft:vine'])
    //腐肉制作
    event.recipes.create.haunting('minecraft:rotten_flesh', '#mynethersdelight:curry_meats')
    //烈焰棒合成
    event.shapeless('minecraft:blaze_rod','6x minecraft:blaze_powder')
    //海晶砂砾合成
    event.recipes.create.crushing(['minecraft:prismarine_crystals',Item.of('2x minecraft:prismarine_crystals').withChance(0.12)],'minecraft:prismarine_shard').processingTime(100)//.withChance(0.12)
    //煤炭合成
    event.recipes.create.haunting(Item.of('minecraft:coal').withChance(0.75),'minecraft:charcoal')
    //细雪桶
    event.recipes.create.haunting('minecraft:powder_snow_bucket','minecraft:water_bucket')
    //雪球
    event.recipes.create.mixing(['5x minecraft:snowball','minecraft:bucket'],['minecraft:powder_snow_bucket','#forge:cobblestone'])
    //缠魂棒
    event.recipes.create.haunting(Item.of('netherexp:banshee_rod').withChance(0.75),'minecraft:blaze_rod')
    //霜冻金属
    event.blasting('rainbow:frostium_ingot','rainbow:raw_frostium',5,2000)
    event.blasting('rainbow:raw_frostium','rainbow:frostium_ore',5,2000)
    event.blasting('rainbow:raw_frostium','rainbow:blue_ice_frostium_ore',5,2000)
    event.shapeless('9x rainbow:frostium_nugget','rainbow:frostium_ingot')
    event.shapeless('rainbow:frostium_ingot','9x rainbow:frostium_nugget')
    //虚空粗矿
    event.blasting('rainbow:raw_voidore','rainbow:void_ore',5,2000)
    //煤炭量产/下界合金
    event.recipes.create.crushing(['minecraft:coal',Item.of('minecraft:netherite_scrap').withChance(0.0001)],'minecraft:blackstone').processingTime(150)//.withChance(0.12)
    //鲨鱼牙齿
    event.recipes.create.crushing(['minecraft:water_bucket','3x alexsmobs:serrated_shark_tooth'],'alexsmobs:frilled_shark_bucket').processingTime(150)
    //熔渣
    event.recipes.create.crushing(['create:crushed_raw_lead','oreganized:raw_asbestos'],'create:scoria').processingTime(150)
    event.recipes.create.crushing(['create:crushed_raw_silver','oreganized:raw_asbestos'],'create:scorchia').processingTime(150)
    //下界岩量产
    event.recipes.create.mixing("minecraft:netherrack",[Fluid.of("minecraft:lava",25), 'minecraft:cobblestone','create:cinder_flour'])
    //岩浆量产
    event.recipes.create.mixing(Fluid.of("minecraft:lava",200),[Fluid.of("minecraft:lava",100),"minecraft:cobblestone"])
    //鬼火瓶
    event.recipes.create.filling('netherexp:wisp_bottle', [Fluid.of("netherexp:ectoplasm",200), 'quark:bottled_cloud'])
    //鲸液
    event.recipes.create.filling('alexsmobs:ambergris', [Fluid.of("youkaishomecoming:suigei",1000), 'rainbow:shit'])
    //臭屁瓶
    event.recipes.create.mixing('alexsmobs:stink_bottle', ['rainbow:shit','quark:bottled_cloud'])
    //雕刻南瓜
    event.stonecutting("minecraft:carved_pumpkin","minecraft:pumpkin");
    //凋零骷髅合成
    event.recipes.create.haunting('minecraft:wither_skeleton_skull','minecraft:player_head')
    //超精密构件
    event.recipes.create.sequenced_assembly(
        "rainbow:super_mechanism",'create:precision_mechanism',
        [event.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism','minecraft:nether_star']),
        event.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism','minecraft:echo_shard']),
        event.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism','minecraft:heart_of_the_sea']),
        event.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism','netherexp:shotgun_core']),
        event.recipes.createDeploying('create:incomplete_precision_mechanism', ['create:incomplete_precision_mechanism','rainbow:shit'])]
    ).transitionalItem('create:incomplete_precision_mechanism').loops(1)
    //液态逻辑
    event.recipes.create.mixing(Fluid.of("rainbow:number_water",50),["rainbow:super_mechanism",Fluid.of("rainbow:oil",50)]).superheated()
    //奇迹物质
    event.recipes.create.filling('rainbow:miracle', [Fluid.of("rainbow:number_water",1000),'rainbow:rainbow_stone'])
    //逻辑运算符
    event.recipes.create.crushing([Item.of('rainbow:plus').withChance(0.25),Item.of('rainbow:minus').withChance(0.25),Item.of('rainbow:multiply').withChance(0.25),Item.of('rainbow:divide').withChance(0.25)],'rainbow:miracle').processingTime(150)
    //熔渣-红石
    event.recipes.create.crushing(Item.of('minecraft:redstone').withChance(0.20),'create:scoria').processingTime(150)
    //焦黑熔渣-萤石
    event.recipes.create.crushing(Item.of('minecraft:glowstone_dust').withChance(0.20),'create:scorchia').processingTime(150)
    //石灰石-银
    event.recipes.create.crushing([Item.of('create:crushed_raw_silver').withChance(0.20),Item.of('oreganized:silver_nugget').withChance(0.20)],'create:limestone').processingTime(150)
    //逻辑运算符
    event.recipes.create.filling('rainbow:three', [Fluid.of("rainbow:number_water",1000), 'create:nixie_tube'])
    event.recipes.create.filling('rainbow:eight', [Fluid.of("rainbow:number_water",1000), 'rainbow:three'])
    //南瓜灯
    event.recipes.create.sequenced_assembly(
        'minecraft:jack_o_lantern','minecraft:carved_pumpkin',
        [event.recipes.createDeploying('minecraft:carved_pumpkin', ['minecraft:carved_pumpkin','minecraft:torch'])]
    ).transitionalItem('minecraft:carved_pumpkin').loops(1)
    //灵魂南瓜灯
    event.recipes.create.sequenced_assembly(
        'netherexp:soul_jack_o_lantern','minecraft:carved_pumpkin',
        [event.recipes.createDeploying('minecraft:carved_pumpkin', ['minecraft:carved_pumpkin','minecraft:soul_torch'])]
    ).transitionalItem('minecraft:carved_pumpkin').loops(1)
    //创造马达
    event.shaped('create:creative_motor',[
        ['create:andesite_alloy_block','rainbow:super_mechanism','rainbow:super_mechanism','create:shaft','rainbow:super_mechanism','rainbow:super_mechanism','create:andesite_alloy_block'],
        ['rainbow:super_mechanism','create:cogwheel','create:cogwheel','create:flywheel','create:large_cogwheel','create:large_cogwheel','rainbow:super_mechanism'],
        ['rainbow:super_mechanism','create:deployer','create:stressometer','create:hand_crank','create:speedometer','create:deployer','rainbow:super_mechanism'],
        ['create:rotation_speed_controller','minecraft:water_bucket','create:large_water_wheel','create:flywheel','create:white_sail','create:windmill_bearing','create:rotation_speed_controller'],
        ['rainbow:super_mechanism','create:deployer','create:copper_valve_handle','create:flywheel','create:hand_crank','create:deployer','rainbow:super_mechanism'],
        ['rainbow:super_mechanism','create:blaze_burner','create:fluid_tank','create:steam_engine','create:fluid_tank','create:blaze_burner','rainbow:super_mechanism'],
        ['create:andesite_alloy_block','rainbow:super_mechanism','rainbow:super_mechanism','create:rotation_speed_controller','rainbow:super_mechanism','rainbow:super_mechanism','create:andesite_alloy_block']
    ])
    //生锈铜
    event.recipes.create.splashing('minecraft:weathered_copper','minecraft:copper_block')
    event.recipes.create.splashing('minecraft:waxed_weathered_copper','minecraft:waxed_copper_block')
    //黄铜溶液
    event.recipes.create.mixing(Fluid.of("rainbow:brass_fluid",1000),["create:brass_block"]).heated()
    //铜溶液
    event.recipes.create.mixing(Fluid.of("rainbow:copper_fluid",1000),['minecraft:copper_block']).heated()
    //710元素
    event.recipes.create.mixing(Fluid.of("createdieselgenerators:crude_oil",250),["5x rainbow:shit"]).heated()
    //黄铜块制作
    event.recipes.create.mixing("2x create:brass_block",["create:zinc_block","minecraft:copper_block"]).heated()
    //青金石
    event.recipes.create.filling('minecraft:lapis_lazuli', [Fluid.of("create_enchantment_industry:experience",200),'oreganized:refined_asbestos'])
    //超经验配方
    event.remove({id:'create_enchantment_industry:mixing/hyper_experience'})
    event.recipes.create.mixing(Fluid.of("create_enchantment_industry:hyper_experience",100),['#rainbow:oldbook','minecraft:lapis_lazuli',Fluid.of("create_enchantment_industry:experience",1000)]).superheated()
    //子弹模具制作
/*    event.shaped('2x rainbow:shaped_mode',[
        ['minecraft:clay_ball','minecraft:clay_ball','minecraft:clay_ball'],
        ['minecraft:clay_ball','rainbow:shaped_mode','minecraft:clay_ball'],
        ['minecraft:clay_ball','minecraft:clay_ball','minecraft:clay_ball']])
    event.shaped('2x rainbow:casings_mode',[
        ['minecraft:clay_ball','minecraft:clay_ball','minecraft:clay_ball'],
        ['minecraft:clay_ball','rainbow:casings_mode','minecraft:clay_ball'],
        ['minecraft:clay_ball','minecraft:clay_ball','minecraft:clay_ball']])
    //复合火药
    event.shapeless('rainbow:composite_gunpowder',['minecraft:gunpowder','minecraft:gunpowder','minecraft:gunpowder','minecraft:charcoal','minecraft:charcoal','minecraft:charcoal','minecraft:sugar','minecraft:sugar','minecraft:flint'])
    */
    //灵魂粉加工
    const list = ['alexsmobs:skreecher_soul', 'netherexp:wraithing_lesion', 'netherexp:wraithing_flesh', 'netherexp:banshee_rod', 'netherexp:banshee_powder', 'quark:soul_bead', 'netherexp:phasmo_shard', 'netherexp:soul_magma_block']
    const value = [32,64,4,3,1,16,4,4]
    list.forEach((item,index)=>{
        event.recipes.create.mixing(`${value[index]}x hmag:soul_powder`,[item,Fluid.of("netherexp:ectoplasm",250)])
    })
    event.recipes.create.mixing(['8x hmag:soul_powder','minecraft:glass_bottle'],['netherexp:wisp_bottle',Fluid.of("netherexp:ectoplasm",250)])

    const list2 = ['hmag:repulsion_gadget', 'hmag:fortune_crystal_plus', 'hmag:fortune_crystal', 'hmag:greedy_crystal_plus', 'hmag:greedy_crystal', 'hmag:honeyed_apple', 'hmag:evil_thorn', 'hmag:evil_prismarine', 'hmag:evil_flame', Item.of('hmag:insomnia_fruit', '{hmag.level:1b}'), 'hmag:soul_apple', 'hmag:randomberry', 'hmag:copper_nugget', 'hmag:reinforcing_chain', 'hmag:multiplex_reinforcing_chain']
    list2.forEach(item=>{
        event.remove({output:item})
    })


    const corundoms = ['quark:red_corundum_cluster', 'quark:orange_corundum_cluster', 'quark:yellow_corundum_cluster', 'quark:green_corundum_cluster', 'quark:blue_corundum_cluster', 'quark:indigo_corundum_cluster', 'quark:violet_corundum_cluster', 'quark:white_corundum_cluster', 'quark:black_corundum_cluster']
    const creates = ['create:veridium', 'create:scorchia', 'create:scoria', 'create:ochrum', 'create:limestone', 'create:asurine', 'create:crimsite', 'quark:myalite', 'quark:dusky_myalite', 'minecraft:basalt', 'quark:limestone', 'oreganized:glance']
    //刚玉合成七彩石
    event.shapeless('9x rainbow:rainbow_stone',corundoms)
    //七彩石合成对应材料
    creates.forEach(item=>{
        event.recipes.create.mixing(Item.of(item,64),[item,"rainbow:rainbow_stone",Fluid.of("minecraft:lava",1000)])
    })
    //逻辑数字合成
    const Numbers =  ['zero','one','two','three','four','five','six','seven','eight','nine']
    const Operaror = ['plus','minus','multiply','divide']
    const NumbersM =  ['one','two','three','four','five','six','seven','eight','nine']
    Numbers.forEach(num1 => {
        Operaror.forEach(op => {
            NumbersM.forEach(num2 => {
                const result = StringNumerOperaror(num1, op, num2);
                if (NumberisOk(result)) {
                    const Item1 = `rainbow:${num1}`;
                    const Result = `rainbow:${NumberToItem(result)}`;
                    const Op = `rainbow:${op}`;
                    const Item2 = `rainbow:${num2}`;
                    event.shaped(Result, [Item1,Op, Item2]);
                } else {
                    const Item1 = `rainbow:${num1}`;
                    const Op = `rainbow:${op}`;
                    const Item2 = `rainbow:${num2}`;
                    event.shaped("rainbow:missingno",[Item1,Op, Item2]);
                }
            });
        });
    });

})