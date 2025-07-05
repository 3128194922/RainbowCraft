// priority: 1000
//EntityEvents.spawned('ender_pearl', e => e.entity.owner.startRiding(e.entity))

let DispenserBlock = Java.loadClass("net.minecraft.world.level.block.DispenserBlock");
const facingMap = {
	'east': [1, 0, 0],
	'west': [-1, 0, 0],
	'south': [0, 0, 1],
	'north': [0, 0, -1],
	'up': [0, 1, 0],
	'down': [0, -1, 0]
};
DispenserBlock.registerBehavior(Item.of("minecraft:ender_pearl").item, (block, item) => {
  const {level} = block;
  const {x, y, z} = block.pos;
  const oldDispenser = level.getBlock([x, y, z]);
  const facing = oldDispenser.properties.get('facing');
  const facingData = facingMap[facing];

  item.count--;

  const ender_pearl = level.createEntity('ender_pearl');
  ender_pearl.setPosition(x+0.5+facingData[0]*0.5, y+0.5+facingData[1]*0.5, z+0.5+facingData[2]*0.5);
  ender_pearl.setMotion(facingData[0], facingData[1], facingData[2]);
  ender_pearl.spawn();

  const newDispenser = level.createEntity('falling_block');
  newDispenser.mergeNbt({
    BlockState: {
      Name: 'minecraft:dispenser',
      Properties: {facing: facing}
    },
    TileEntityData: {Items: oldDispenser.entityData.Items}
  });
  newDispenser.copyPosition(ender_pearl);
  newDispenser.startRiding(ender_pearl);
  newDispenser.spawn();

  oldDispenser.setEntityData({Items: ''});
  oldDispenser.set('air');
})
//扳手调整原版红石方块
;(() => {
  /** @type {{string:Internal.Direction_}} */
  const direction = {
    up: Direction.UP,
    down: Direction.DOWN,
    north: Direction.NORTH,
    south: Direction.SOUTH,
    east: Direction.EAST,
    west: Direction.WEST,
  }

  const whitelist = {
    'minecraft:piston': true,
    'minecraft:sticky_piston': true,
    'minecraft:repeater': true,
    'minecraft:comparator': true,
    'minecraft:dispenser': true,
    'minecraft:dropper': true,
    'minecraft:hopper': true,
    'minecraft:observer': true,
  }

  const forbiddenStates = {
    'minecraft:hopper': 'up',
  }

  BlockEvents.rightClicked((e) => {
    const { item, hand, facing, block, player } = e
    if (hand !== 'main_hand' || player.crouching) return
    if (item.id !== 'create:wrench') return
    if (block.id.startsWith('create:')) return
    if (!whitelist[block.id]) return
    if (block.properties === undefined) return
    const blockFacing = block.properties.facing
    if (blockFacing === undefined) return
    /** @type {Internal.Direction_} */
    const blockFacingDirection = direction[blockFacing]
    let newDirection
    /**
     * facing.axis is one of [x, y, z] without regard for the positive or
     * negative direction. We need to take into account the negative or positive
     * directive or this will rotate blocks the opposite way if we are facing
     * the opposite side of the block.
     */
    if (facing.axisDirection.step > 0) {
      newDirection = blockFacingDirection.getClockWise(facing.axis)
    } else {
      newDirection = blockFacingDirection.getCounterClockWise(facing.axis)
    }
    const newProperties = Object.assign({}, block.properties, {
      facing: newDirection,
    })
    if (forbiddenStates[block.id] === newDirection) return
    block.set(block.id, newProperties)
    player.swing()
    if (newDirection !== blockFacingDirection) {
      player.playNotifySound('create:wrench_rotate', 'players', 2, 1)
    }
    e.cancel()
  })
})()

//shift右键调整音调
BlockEvents.rightClicked('minecraft:note_block', (e) => {
  const { player, block, level } = e
  if (!player.isCrouching()) return

  // Set the block note to the previous note
  const bp = block.properties
  const newNote = (parseInt(bp.getOrDefault('note', 0), 10) + 24) % 25
  const instrument = bp.getOrDefault('instrument', 'harp')
  block.set(block.getId(), {
    instrument: new String(instrument),
    note: new String(newNote),
    powered: new String(bp.getOrDefault('powered', false)),
  })

  // Helper to play sounds to players nearby
  const playSound = (sound, volume, pitch) => {
    block.getPlayersInRadius(5).forEach((p) => {
      Utils.server.runCommandSilent(
        `playsound ${sound} block ${p.displayName.string} ${block.x} ` +
          `${block.y} ${block.z} ${volume} ${pitch}`
      )
    })
  }

  // Display the note particle like how the normal right click event
  const soundEvent = `block.note_block.${instrument}`
  const pitch = Math.pow(2, (newNote - 12) / 12)
  playSound(soundEvent, 2, pitch)
  const particlePos = block.pos.getCenter().add(0, 0.7, 0)
  level.spawnParticles(
    'minecraft:note',
    true, // overrideLimiter
    particlePos.x(), // x
    particlePos.y(), // y
    particlePos.z(), // z
    newNote / 24, // vx, used as pitch when count is 0
    0, // vy, unused
    0, // vz, unused
    0, // count, must be 0 for pitch argument to work
    1 // speed, must be 1 for pitch argument to work
  )

  // Cancel the default sound event
  e.cancel()
})
