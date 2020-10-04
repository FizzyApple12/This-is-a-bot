const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stat, music, serverPrefs) {
    var content = msg.content.substring(config.prefix.length);

    var personToCheck;

    if (args[1]) {
        var id = "";
        id = args[1];
        if (id.includes("<@!")) {
            id = id.replace("<@!", "");
            id = id.replace(">", "");
        }
        bot.users.find(user => {
            var dtc = user.username + "#" + user.discriminator
            if (dtc == content.substring(6)) {
                id = user.id;
            }
            return dtc == args[1]
        });
        personToCheck = id;
    }
    else personToCheck = msg.author.id;

    stat.findOne({ id: personToCheck }, (err, res) => {
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
            messageUtils.reply(msg, "Cannot find that user in my database. Check your id or tag");
        }
    });
}

exports.info = {
    name: 'check',
    usage: 'check {id or tag of user}',
    description: 'Checks your statistics',
    category: "stats"
};
