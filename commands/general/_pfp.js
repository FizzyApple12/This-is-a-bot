const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args) {
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
            if (dtc == content.substring(4)) {
                id = user.id;
            }
            return dtc == args[1]
        });
        personToCheck = id;
    }
    else personToCheck = msg.author.id;

    let user = bot.users.find('id', personToCheck);

    if (user) messageUtils.sendChannel(msg, user.avatarURL);
    else messageUtils.sendChannel(msg, 'Could not find that user.');
}

exports.info = {
    name: 'pfp',
    usage: 'pfp [user id, tag, or @]',
    description: 'Sends the full profile picture of a user',
    category: "images"
};