const Discord = module.require("discord.js");
const config = module.require('./config.json');

module.exports.sendChannel = (msg, message) => {
    var filteredMessage = message;

    filteredMessage = filteredMessage.replace(/<@(!|&)[0-9]*>/g, (match) => {
        var replaceWith = "";

        id = match.replace(/<@(!|&)/g, "");
        id = id.replace(/>/g, "");

        if (match.includes("<@!")) {
            bot.users.find(user => {
                var dtc = user.username + "#" + user.discriminator;
                if (id == user.id) replaceWith = dtc;
                return id == user.id
            });
        } else if (match.includes("<@&")) {
            msg.guild.roles.find(role => {
                if (id == role.id) replaceWith = role.name;
                return id == role.id
            });
        }

        return replaceWith;
    });

    return msg.channel.send(filteredMessage)
}

module.exports.reply = (msg, message) => {
    var filteredMessage = message;

    filteredMessage = filteredMessage.replace(/<@(!|&)[0-9]*>/g, (match) => {
        var replaceWith = "";

        id = match.replace(/<@(!|&)/g, "");
        id = id.replace(/>/g, "");

        if (match.includes("<@!")) {
            bot.users.find(user => {
                var dtc = user.username + "#" + user.discriminator;
                if (id == user.id) replaceWith = dtc;
                return id == user.id
            });
        } else if (match.includes("<@&")) {
            msg.guild.roles.find(role => {
                if (id == role.id) replaceWith = role.name;
                return id == role.id
            });
        }

        return replaceWith;
    });

    return msg.reply(filteredMessage)
}