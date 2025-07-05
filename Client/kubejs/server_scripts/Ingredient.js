// priority: 0
//香蕉
ServerEvents.recipes(event => {
    event.replaceInput({input: 'neapolitan:banana'}, 
    Ingredient.of('neapolitan:banana'), 
    Ingredient.of('#alexsmobs:capuchin_monkey_tameables'))
})

ServerEvents.recipes(event => {
    event.replaceInput({input: 'alexsmobs:banana'}, 
    Ingredient.of('alexsmobs:banana'), 
    Ingredient.of('#alexsmobs:capuchin_monkey_tameables'))
})
//红豆
ServerEvents.recipes(event => {
    event.replaceInput({input: 'neapolitan:adzuki_beans'}, 
    Ingredient.of('neapolitan:adzuki_beans'), 
    Ingredient.of('#rainbow:redbean'))
})

ServerEvents.recipes(event => {
    event.replaceInput({input: 'youkaishomecoming:redbean'}, 
    Ingredient.of('youkaishomecoming:redbean'), 
    Ingredient.of('#rainbow:redbean'))
})
//冰！
ServerEvents.recipes(event => {
    event.replaceInput({input: 'neapolitan:ice_cubes'}, 
    Ingredient.of('neapolitan:ice_cubes'), 
    Ingredient.of('#forge:ice_cubes'))
})

ServerEvents.recipes(event => {
    event.replaceInput({input: 'youkaishomecoming:ice_cube'}, 
    Ingredient.of('youkaishomecoming:ice_cube'), 
    Ingredient.of('#forge:ice_cubes'))
})

ServerEvents.recipes(event => {
    event.remove({output: 'youkaishomecoming:ice_cube'}) 
})
//牛奶
ServerEvents.recipes(event => {
    event.replaceInput({input: 'farmersdelight:milk_bottle'}, 
    Ingredient.of('farmersdelight:milk_bottle'), 
    Ingredient.of('#forge:milk'))
})

ServerEvents.recipes(event => {
    event.replaceInput({input: 'neapolitan:milk_bottle'}, 
    Ingredient.of('neapolitan:milk_bottle'), 
    Ingredient.of('#forge:milk'))
})

ServerEvents.recipes(event => {
    event.remove({output: 'neapolitan:milk_bottle'}) 
})