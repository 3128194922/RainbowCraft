//物品介绍实例
ItemEvents.tooltip((event) =>{
    //添加一个最普通的文本，这个文本是在最下面进行显示的
    //event.add('rainbow:super_mechanism', "这玩意好像用奇怪的东西合成...")
    //用数组添加文本，在游戏内数组的每个文本都独占一行
    //event.add('diamond', ["数组文本1","数组文本2"])
    //当你需要拼接字符串时可以使用下面方法
    //event.add('diamond', Text.of("该物品现属于").append(Client.player.username))
    //当你需要改变文本颜色时,只需要在后面添加一个颜色参数就可以
    //event.add('rainbow:super_mechanism', Text.of("上面显示的名字：").append(Client.player.username).red())
})

ItemEvents.tooltip((event) =>{
    event.addAdvanced("rainbow:eldritch_pan", (item,advanced,text) =>{
        if(item.nbt.foodnumber<3 || !item.nbt.foodnumber)
            {
                text.add(0,Text.darkPurple("饕餮之锅"));
            }
        else
        {
            text.add(0,Text.darkPurple("饕餮之锅(觉醒)"));
        }
        text.add(1,Text.red("味觉觉醒度：").append(Text.lightPurple(`${item.nbt.foodnumber}`)));
    })
})