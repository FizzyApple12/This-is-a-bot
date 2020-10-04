const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stat) {
    var start = new Date();
    stat.findOne({ type: "BOTPRIV" }, (err, res) => {
        if (err) return;

        var ms = "0";
        var mp = "0";

        if (res) {
            ms = res.messagesSeen.toString()
            mp = res.messagesProcessed.toString()
        }

        var now = new Date();
        var onlineSince = now - bot.uptime
        var embFeilds = [
            {
                name: "Discord Connection\nStatus",
                value: `${bot.status.toString()} => ${config.statuses[bot.status]}`,
                inline: true
            },
            {
                name: "Uptime",
                value: `Online since\n${new Date(onlineSince).toLocaleString()}`,
                inline: true
            },
            {
                name: "Messages Seen",
                value: ms,
                inline: true
            },
            {
                name: "Messages Processed",
                value: mp,
                inline: true
            },
            {
                name: "Discord Latency",
                value: `${Math.round(bot.ping)}ms`,
                inline: true
            },
            {
                name: "MongoDB Latency",
                value: `${new Date() - start}ms`,
                inline: true
            }
        ]
        messageUtils.sendChannel(msg, "", {
            embed: {
                color: 6697881,
                author: {
                    name: "Bot Status"
                },
                thumbnail: {
                    url: bot.user.avatarURL
                },
                fields: embFeilds,
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: bot.user.tag
                }
            }
        });
    });
}

exports.info = {
    name: 'botstat',
    usage: 'botstat',
    description: 'Gets the current status of the bot',
    category: "general"
};