//代码来源 https://discord.com/channels/303440391124942858/1254361668587360348
const XercaMusic = Java.loadClass('xerca.xercamusic.common.XercaMusic').NETWORK_HANDLER
let $SingleNotePacket = Java.loadClass('xerca.xercamusic.common.packets.SingleNotePacket');
$SingleNotePacket = new $SingleNotePacket();
let $SingleNotePacketHandler = Java.loadClass('xerca.xercamusic.common.packets.SingleNotePacketHandler')
$SingleNotePacketHandler = new $SingleNotePacketHandler();


//Network override stuff. Here be dragons.
function encode(pkt, buf) {
    $SingleNotePacket.encode(pkt,buf)
}
function decode(pkt) {
    return $SingleNotePacket.decode(pkt);
}
function handle(message,ctx) {
    if (!message.isStop()) {
        //The below is likely not thread safe. Not sure how stable this is. Worked fine for me so far. ¯\_(ツ)_/¯
        //If you modify this, be very careful with what you modify in the netty thread(Or, in this function or any branching functions). Rhino *will* freeze and be very angry at you!
        const player = ctx.get().getSender();
        if (player.data.playedNotes==null) player.data.playedNotes = Array(maxNotes);
        const noteArray = player.data.playedNotes;
        noteArray.unshift(message.getNote());
        noteArray.pop();
    }
    $SingleNotePacketHandler.handle(message,ctx);
}
XercaMusic.registerMessage(3, $SingleNotePacket.class, encode, decode, handle); //Yay for wide open packet managers! Thanks Xercamusic!


//Short convenience things
function setInspiration(player, insp) {
    player.data.music.insp = insp;
    player.sendData('insp_update',{num: insp});
}
function doesArrayStartWith(startWithArray, arrayToFind) {
    for (var i=0;i<startWithArray.length; i++) {
        if (arrayToFind[i]!=startWithArray[i]) return false;
    }
    return true;
}
const XercaKeymap = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"] //This is currently only here to be a convenient showing of notes.
                //    Q   W    E   R   T    Y   U    I   O   P    [   ]
                //    1   2    3   4   5    6   7    8   9  10   11  12

const maxNotes = 12;

PlayerEvents.chat(event => { //This is just here for debugging. Should be removed later.
    if (event.message.contains(".recharge")) { 
        setInspiration(event.player,100);
        event.cancel();
    }
})
      


//The actual songs
const songs = [
    {
        keys: [1,3,1,4].reverse(), //Water Theme (mario)
        cost: 100,
        sound: "minecraft:item.bucket.fill",
        func: function(player) {
            if(player.getItemInHand("main_hand").id == 'xercamusic:flute')
                {
                    player.potionEffects.add("attributeslib:knowledge",-1,0,false,false)
                    player.tell("你感受到古代的智慧在你的脑中翻涌")
                }
                else if(player.getItemInHand("main_hand").id == 'xercamusic:guitar')
                    {
                        if (hasCurios(player, "minecraft:tnt")) {
                            player.getServer().runCommandSilent(`/summon minecraft:tnt ${player.x} ${player.y} ${player.z}`);
                            player.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
                        } else if (hasCurios(player, "oreganized:shrapnel_bomb")) {
                            player.getServer().runCommandSilent(`/summon oreganized:shrapnel_bomb ${player.x} ${player.y} ${player.z}`);
                            player.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
                        } else if (hasCurios(player, "savage_and_ravage:spore_bomb")) {
                            player.getServer().runCommandSilent(`/summon savage_and_ravage:spore_bomb ${player.x} ${player.y} ${player.z}`);
                            player.getCuriosStacksHandler("back").get().getStacks().setStackInSlot(0, "minecraft:air");
                        } else {
                            player.tell("没有装备对应的tnt饰品！")
                        }
                    }
                    else
                    return false;
            return true;
        },
    },
];

PlayerEvents.tick(event => {
    const player = event.getPlayer();

    
})

///The fun magic.
PlayerEvents.tick(event => {
    const player = event.player;
    if (player.data.tickCount==null) player.data.tickCount=0;
    if (player.data.tickCount++%5!=1) return;
    checkForInspirationUpdate(player);
    if (player.data.music.insp==null) setInspiration(player,100);
    const insp = player.data.music.insp;
    const notes = player.data.playedNotes;
    if (notes==null) return;
    var noteList = []
    for (var i=0;i<notes.length;i++) { //Normalize the notes
        //let noteInOctave = ((note - 9) % 12);
        //let noteOctave = Math.floor((note - 9) / 12);
        noteList[i] = Math.floor((notes[i]-9)%12)+1;
    } 
    for (var i=0;i<songs.length;i++) {
        if (!doesArrayStartWith(songs[i].keys,noteList)) continue;
        player.data.playedNotes=Array(maxNotes);
        if (insp < songs[i].cost) {
            player.tell("你觉得灵感不够");
            break;
        }
        if (songs[i].func(player)) {
            let pname = player.name.string;
            if (songs[i].sound!=null) event.server.runCommandSilent("execute at " + pname + " run playsound "+songs[i].sound+" player @a ~ ~ ~");
            setInspiration(player,insp-songs[i].cost);
        }
    }
})
function checkForInspirationUpdate(player, insp) {
    const pdata = player.data;
    if (player.data.music==null) {
        pdata.music = {};
        let mdata = pdata.music;
        mdata.biome = player.block.boimeId;
        mdata.position = player.position();
        mdata.rain = player.getLevel().isRaining();
        mdata.pendingInsp = 0;
        mdata.dimension = player.getLevel().getDimension().getPath();
    }
    let mdata = pdata.music;
    //The players inspiration gets small boosts when...
    if (pdata.tickCount++%120==1) mdata.pendingInsp+=0.1; //..Time passes
    if (pdata.tickCount%3600==1 && mdata.biome!=player.block.biomeId) { //..New biomes are explored
        mdata.biome = player.block.biomeId;
        mdata.pendingInsp+=3.0;
    }
    if (pdata.tickCount%1200==1 && mdata.position.distanceTo(player.position())>32) { //..Moving around
        mdata.position = player.position();
        mdata.pendingInsp+=0.5;
    }
    if (pdata.tickCount%2400==1 && mdata.rain!=player.getLevel().isRaining()) { //..Experiencing a change in weather
        mdata.rain = player.getLevel().isRaining();
        mdata.pendingInsp+=2.5;
    }
    if (pdata.tickCount%2400==1 && mdata.dimension!=player.getLevel().getDimension().getPath()) { //..Exploring new dimensions
        mdata.dimension = player.getLevel().getDimension().getPath();
        mdata.pendingInsp+=2.5;
    }
    if (mdata.pendingInsp==0) return;
    insp+=mdata.pendingInsp;
    mdata.pendingInsp = 0;
    if (insp < 0) insp = 0;
    if (insp > 100) insp = 100;
    setInspiration(player,insp);
}