const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stat, music, serverPrefs) {
    if (args[1]) { //9437439
        stat.updateOne({ id: msg.author.id }, {
            $set: {
                quote: args[1]
            }
        });
        stat.findOne({ id: msg.author.id }, (err, res) => {
            if (err) messageUtils.reply(msg, "Error retrieving data from MongoDB.");
            if (res) {
                var totalXP = res.xp;
                for (var j = 0; j < res.level - 1; j++) {
                    totalXP += (res.level * config.xpCoefficient);
                }
                try {
                    serverPrefs.findOne({ id: msg.guild.id }, (err2, res2) => {
                        if (err2 || !res2) messageUtils.sendChannel(msg, "", messageUtils.generateStatsCard(msg, res, totalXP, false, null));
                        else messageUtils.sendChannel(msg, "", messageUtils.generateStatsCard(msg, res, totalXP, true, res2));
                    });
                } catch (e) {
                    messageUtils.sendChannel(msg, "", messageUtils.generateStatsCard(msg, res, totalXP, false, null));
                }
            } else {
                messageUtils.reply(msg, "Cannot find you in my database!");
            }
        });
    } else {
        messageUtils.reply(msg, "Oops, you may have used that wrong, proper usage is: ``" + config.prefix + exports.info.usage + "``");
    }
}

exports.info = {
    name: 'quote',
    usage: 'quote "[quote]"',
    description: 'Sets your quote',
    category: "stats"
};