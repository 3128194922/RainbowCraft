/*EnchantJSEvent.modification(event=>{
    // 修改"力量"附魔
   event.modify('minecraft:power',(enchant)=>{
      enchant.setRealMaxLevel(2) // 将最大等级限制为2（原版为5）
    })
  
    // 修改"无限"附魔
    event.modify("minecraft:infinity",(enchant)=>{
      enchant.setRealMaxLevel(2)    // 最大等级改为2（原版为1）
      enchant.setRealMinLevel(1)    // 最小等级保持1
      enchant.setCanApplyAtEnchantingTableFn(stack=>false) // 禁止在附魔台使用
      enchant.setRarity("very_rare") // 设置为"非常稀有"（原版为"稀有"）
    })
  
    // 修改"火焰附加"附魔
    event.modify("minecraft:flame",enchant=>{
      enchant.setCategory(i=>true) // 允许所有类别物品附魔（原版仅限弓）
    })
  
    // 修改"耐久"附魔
    event.modify("minecraft:unbreaking",enchant=>{
      enchant.setCategory(i=>true) // 允许所有类别物品附魔
    })
  })*/
