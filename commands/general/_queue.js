const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, args, stat, music) {
    music.queue(args[1]);
    messageSanitizer.sendChannel(msg, "", {
        embed: {
            color: 6697881,
            author: {
                name: "Music"
            },
            fields: [
                {
                    "name": "Added to queue:",
                    "value": args[1]
                }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.tag + " | " + music.list().length + " in queue."
            }
        }
    });
}

exports.info = {
    name: 'play',
    usage: 'play "{url}"',
    description: 'Queues a song to play',
    category: "music"
};