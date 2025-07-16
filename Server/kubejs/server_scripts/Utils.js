// priority: 1000
global.WhileFoodList = []

/**
* 监听饰品栏添加效果
*/
let CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi")

/**
* 在实体饰品栏中寻找饰品
* @param {Internal.Item} stack 饰品
* @param {Internal.LivingEntity_} entity 实体
*/
function hasCurios(entity, stack) {
return CuriosApi.getCuriosHelper().findEquippedCurio(stack, entity).isPresent()
}

/**
* 输出所有食物列表
*/

function FoodList()
{
    Ingredient.all.itemIds.forEach(itemId=>{
        if(Item.of(itemId).item.foodProperties)
        console.log(Item.of(itemId).item.foodProperties.getNutrition().toString()+"#"+itemId)
        })
}

/**
* 输出所有武器列表
*/

function WeaponList()
{
    Ingredient.all.itemIds.forEach(itemId=>{
        if(Item.of(itemId).item.attackDamage)
        console.log(Item.of(itemId).item.id)
        })
}


/**
* 返回末影箱里复合条件的食物数量
* @param {Internal.PlayerEnderChestContainer} enderChest 饰品
*/

function getEndChestFoods(enderChest)
{
    const number = 0;
    for (let i = 0; i < 27; i++) {
        if (!enderChest.getItem(i).isEmpty()) {
            if(global.WhileFoodList.includes(enderChest.getItem(i).id))
            {
                number++;
            }
        }
    }
    return number;
}

/**
* 刷怪蛋ID转实体ID
* @param {String[]} entityList 饰品
*/
function removeSpawnEggSuffix(entityList) {
    return entityList.map(entity => {
        const parts = entity.split('_spawn_egg');
        return parts[0];
    });
}

/**
 * 根据概率返回 true 或 false
 * @param {number} probability - 概率值（0 ≤ probability ≤ 1）
 * @returns {boolean} 
 */
function randomBool(probability) {
    return Math.random() < probability;
}


/**
 * 物品数字和变量数字的转变
 * @param {String} Item
 * @returns {String | Number} 
 */
function ItemToNumberF(Item) {
    const ItemToNumber ={
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
        'plus': '+',
        'minus': '-',
        'multiply': '*',
        'divide': '/',
        'missingno': "none"
      }

    return ItemToNumber[Item]
}

/**
 * 数字和符号转物品名称
 * @param {String | Number} num 
 * @returns {String}
 */
function NumberToItem(num) {
    const NumberToItemMap = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        '+': 'plus',
        '-': 'minus',
        '*': 'multiply',
        '/': 'divide',
        'none': 'missingno'
    };

    return NumberToItemMap[num];
}

/**
 * 字符数字运算
 * @param {String} Num1
 * @param {String} Operaror
 * @param {String} Num2
 * @returns {Number} 
 */
function StringNumerOperaror(Num1, Operaror, Num2) {
    const num1 = ItemToNumberF(Num1);
    const num2 = ItemToNumberF(Num2);
    const op = ItemToNumberF(Operaror);
    
    switch(op) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return num2 === 0 ? NaN : num1 / num2; // 处理除零错误
        default: return NaN; // 无效运算符
    }
}

/**
 * 数字逻辑验证函数
 * @param {Number} Num
 * @returns {boolean} 
 */
function NumberisOk(Num) {
    return Num >= 0 && Num <= 9 && Number.isInteger(Num) && !isNaN(Num);
}

/**
 * 获取GLFW标准按键值
 * @param {string} keyName - GLFW_KEY_开头的按键名称（不区分大小写）
 * @returns {number|null} 返回对应的键值，未找到返回null
 */
function getGlfwKeyValue(keyName) {
    // 移除可能的前缀并转为大写
    const normalizedKeyName = keyName.replace(/^GLFW_KEY_/i, '').toUpperCase();
    
    // GLFW键值映射表
    const keyMap = {
        // 基本键 (32-162)
        'SPACE': 32,
        'APOSTROPHE': 39,
        'COMMA': 44,
        'MINUS': 45,
        'PERIOD': 46,
        'SLASH': 47,
        '0': 48, '1': 49, '2': 50, '3': 51, '4': 52,
        '5': 53, '6': 54, '7': 55, '8': 56, '9': 57,
        'SEMICOLON': 59,
        'EQUAL': 61,
        'A': 65, 'B': 66, 'C': 67, 'D': 68, 'E': 69,
        'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74,
        'K': 75, 'L': 76, 'M': 77, 'N': 78, 'O': 79,
        'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84,
        'U': 85, 'V': 86, 'W': 87, 'X': 88, 'Y': 89, 'Z': 90,
        'LEFT_BRACKET': 91,
        'BACKSLASH': 92,
        'RIGHT_BRACKET': 93,
        'GRAVE_ACCENT': 94,
        'WORLD_1': 161,
        'WORLD_2': 162,

        // 功能键 (256-348)
        'ESCAPE': 256,
        'ENTER': 257,
        'TAB': 258,
        'BACKSPACE': 259,
        'INSERT': 260,
        'DELETE': 261,
        'RIGHT': 262,
        'LEFT': 263,
        'DOWN': 264,
        'UP': 265,
        'PAGE_UP': 266,
        'PAGE_DOWN': 267,
        'HOME': 268,
        'END': 269,
        'CAPS_LOCK': 280,
        'SCROLL_LOCK': 281,
        'NUM_LOCK': 282,
        'PRINT_SCREEN': 283,
        'PAUSE': 284,
        'F1': 290, 'F2': 291, 'F3': 292, 'F4': 293, 'F5': 294,
        'F6': 295, 'F7': 296, 'F8': 297, 'F9': 298, 'F10': 299,
        'F11': 300, 'F12': 301, 'F13': 302, 'F14': 303, 'F15': 304,
        'F16': 305, 'F17': 306, 'F18': 307, 'F19': 308, 'F20': 309,
        'F21': 310, 'F22': 311, 'F23': 312, 'F24': 313, 'F25': 314,
        'KP_0': 320, 'KP_1': 321, 'KP_2': 322, 'KP_3': 323, 'KP_4': 324,
        'KP_5': 325, 'KP_6': 326, 'KP_7': 327, 'KP_8': 328, 'KP_9': 329,
        'KP_DECIMAL': 330,
        'KP_DIVIDE': 331,
        'KP_MULTIPLY': 332,
        'KP_SUBTRACT': 333,
        'KP_ADD': 334,
        'KP_ENTER': 335,
        'KP_EQUAL': 336,
        'LEFT_SHIFT': 340,
        'LEFT_CONTROL': 342,
        'LEFT_ALT': 343,
        'LEFT_SUPER': 344,
        'RIGHT_SHIFT': 345,
        'RIGHT_CONTROL': 346,
        'RIGHT_SUPER': 347,
        'MENU': 348
    };

    return keyMap[normalizedKeyName] !== undefined ? keyMap[normalizedKeyName] : null;
}


/**
 * boat转化（精确匹配版）
 * @param {string} boatId 
 * @returns {string} 
 */
function BoatToChestBoat(boatId) {
    // 定义boat和chest_boat的对应关系
    const boat = [
        'minecraft:boat',
        'blueprint:boat',
        'quark:quark_boat'
    ];
    
    const chest_boat = [
        'minecraft:chest_boat',
        'blueprint:chest_boat',
        'quark:quark_chest_boat'
    ];

        return chest_boat[boat.indexOf(boatId)];
}


/**
 * 矿车实体右键对应关系
 * @param {string} ItemStack 
 * @returns {string} 
 */
function McTo(ItemStack) {
    const items = ['minecraft:hopper','minecraft:tnt','minecraft:furnace','oreganized:shrapnel_bomb']
    const entitys = ['minecraft:hopper_minecart','minecraft:tnt_minecart','minecraft:furnace_minecart','oreganized:shrapnel_bomb_minecart']
    const furnaces = ['quark:deepslate_furnace','quark:blackstone_furnace']
    if(items.indexOf(ItemStack) == -1 && furnaces.indexOf(ItemStack) == -1) return null;
    if(furnaces.indexOf(ItemStack) != -1)
        {
            return 'minecraft:furnace_minecart';
        }
    else return entitys[items.indexOf(ItemStack)]
}


/**
 * 实体转化黑名单
 * @param {string} ItemStack 
 * @returns {boolean} 
 */
function BoatidOK(ItemStack) {
    const entitys = ['minecraft:chest_minecart','minecraft:hopper_minecart','minecraft:tnt_minecart','minecraft:furnace_minecart','oreganized:shrapnel_bomb_minecart','minecraft:chest_boat','blueprint:chest_boat','quark:quark_chest_boat']
    return entitys.indexOf(ItemStack)==-1?true:false;
}

/**
 * 返回对应槽位物品列表
 * @param {Internal.Player} player 
 * @param {string} slot
 * @returns {ItemList: [{}]}
 */
function getCuriosItemList(player,slot){
    let curio = player.nbt.ForgeCaps['curios:inventory']["Curios"].find(function(curio) {
		return curio["Identifier"] === slot;
	})
    return curio ? curio.StacksHandler.Stacks.Items : [];
}


/**
 * 返回是否有此物品在player的slot上，及物品数量，对应槽位号(该对应槽位的第几个)，对应槽位数量
 * @param {Internal.Player} player 
 * @param {string} slot
 * @param {string} id 
 * @returns {{hasItem: boolean, count: number, SlotNum: number, SlotSize: number}}
 */
function CuriosPlayer(player,slot,id){
	let result = { 
        hasItem: false, 
        count: 0, 
        SlotNum: 0, 
        SlotSize: 0
    };
	
    let ItemList = getCuriosItemList(player,slot)
	result.SlotSize = player.nbt.ForgeCaps['curios:inventory']["Curios"].find(function(curio) {
		return curio["Identifier"] === slot;
	}).StacksHandler.Cosmetics.Size
	ItemList.forEach(item => {if (item.id === id) { 
		result.hasItem = true;
        result.count += item.Count;
        result.SlotNum = item.Slot;
	}})
    return result;
}

//以下思路来源于群友落秋与curios源码
//对饰品栏插槽的直接控制
let $CuriosApi = Java.loadClass("top.theillusivec4.curios.api.CuriosApi")
/**
 * 
 * @param {"shrink"|"grow"|"getfor"|"setfor"|"unlock"|"lock"} method 
 * @param {string} slot 
 * @param {Internal.Player} player 
 * @param {Number} amount 
 * @returns 
 */
function CuriosSlotMethod(method,slot,player,amount){
    switch(method)
    {
        case "shrink":  //减去对应玩家相应数量的对应插槽
            $CuriosApi.getSlotHelper().shrinkSlotType(slot, amount, player)
            break;
        case "grow":  //添加对应玩家相应数量的对应插槽
            $CuriosApi.getSlotHelper().growSlotType(slot, amount, player)
            break;
        case "getfor":  //获取对应玩家对应插槽的数量
            console.log($CuriosApi.getSlotHelper().getSlotsForType(player, slot))
            return $CuriosApi.getSlotHelper().getSlotsForType(player, slot)
        case "setfor":  //设置对应玩家对应插槽的数量
            $CuriosApi.getSlotHelper().setSlotsForType(slot, player, amount)
            break;
        case "unlock":  //解锁对应玩家对应插槽
            $CuriosApi.getSlotHelper().unlockSlotType(slot, player)
            break;
        case "lock":   //锁定对应玩家对应插槽
            $CuriosApi.getSlotHelper().lockSlotType(slot, player)
            break;
    }
}

/**
 * 将秒转化为游戏内的tick
 * @param {Number} input 单位 秒
 * @returns {Number}
 */
function SecoundToTick(input) {
    return input*20;
}

    
// 将朝向反向，让防御面朝外
function reverseDirection(dir) {
    let reverse = {
        "down": "up",
        "up": "down",
        "north": "south",
        "south": "north",
        "west": "east",
        "east": "west"
    };
    return reverse[dir];
}
