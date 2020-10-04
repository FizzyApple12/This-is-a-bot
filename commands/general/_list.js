const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stat, music) {
    var songList = [];
    songList += music.list();
    var songs = [];

    songList.forEach((song, index) => {
        songs.push({
            "name": "Song #" + index,
            "value": song
        });
    });
    messageUtils.sendChannel(msg, "", {
        embed: {
            color: 6697881,
            author: {
                name: "Music"
            },
            fields: songs,
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.tag + " | " + music.list().length + " in queue."
            }
        }
    });
}

exports.info = {
    name: 'list',
    usage: 'list',
    description: 'Checks what song is currently playing',
    category: "music"
};