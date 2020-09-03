const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

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

    console.log(bot.users)
    let user = bot.users.find('id', personToCheck);

    messageSanitizer.reply(msg, user.avatarURL);
}

exports.info = {
    name: 'pfp',
    usage: 'pfp [user id, tag, or @]',
    description: 'description',
    category: "category"
};