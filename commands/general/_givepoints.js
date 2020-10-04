const { floor } = require("mathjs");

const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stats, music, serverPrefs) {
    if (msg.author.id != config.ownerID) {
        messageUtils.sendChannel(msg, "How about no <@!" + msg.author.id + ">?");
        return;
    }

    var personToModify;
    var pointModification;

    if (args[1]) {
        var id = "";
        id = args[1];
        if (id.includes("<@!")) {
            id = id.replace("<@!", "");
            id = id.replace(">", "");
        }
        bot.users.find(user => {
            var dtc = user.username + "#" + user.discriminator
            if (dtc == args[1]) id = user.id;
            return dtc == args[1]
        });
        personToModify = id;
    } else return messageUtils.sendChannel(msg, "No user specified, please specify a user to give points.");

    if (args[2] && !isNaN(args[2])) pointModification = parseInt(args[2]);
    else return messageUtils.sendChannel(msg, "No number specified, please specify the number of points to give the user.");

    if (pointModification <= 1) return messageUtils.sendChannel(msg, "You must specify a positive number of points to give the user.");

    try {
        serverPrefs.findOne({ id: msg.guild.id }, (err2, res2) => {
            if (err2 || !res2) return messageUtils.sendChannel(msg, 'You are not inside a server, please move to a server and try again.');
            else {
                var modifications = {};
                modifications[`serverPoints.${msg.guild.id}`] = pointModification;
                stats.updateOne({ id: msg.author.id }, {
                    $inc: modifications
                });
            }
        });
    } catch (e) {
        messageUtils.sendChannel(msg, 'You are not inside a server, please move to a server and try again.');
    }

    messageUtils.sendChannel(msg, `Gave <@!${personToModify}> ${pointModification} point${(pointModification == 1) ? '' : 's'}!`);
}

exports.info = {
    name: 'givepoints',
    usage: 'givepoints "[id or tag]" [number of points]',
    description: 'Gives server points to a user.',
    category: "economy"
};