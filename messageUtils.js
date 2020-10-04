const Discord = module.require("discord.js");
const config = module.require('./config.json');

module.exports.sendChannel = (msg, message, opts) => {
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

    return msg.channel.send(filteredMessage, opts)
}

module.exports.reply = (msg, message, opts) => {
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

    return msg.reply(filteredMessage, opts)
}

exports.generateStatsCard = (msg, userStats, totalXP, server, serverStats) => {
    var feilds = [
        {
            name: "Level",
            value: userStats.level
        },
        {
            name: "XP",
            value: userStats.xp + "/" + (userStats.level * config.xpCoefficient) + "\nTotal: " + totalXP + "XP"
        }
    ];

    if (server) feilds.push({
        name: `${serverStats.config.pointName}s (This Server's Currency)`,
        value: `${userStats.serverPoints[msg.guild.id]} ${serverStats.config.pointName}${(userStats.serverPoints[msg.guild.id] == 1) ? '' : 's'}`
    });

    feilds.push({
        name: "Rank(s)",
        value: userStats.rank + "\n" + userStats.rankSP
    });

    return {
        embed: {
            color: userStats.color,
            title: "\"" + userStats.quote + "\"",
            author: {
                name: userStats.username
            },
            thumbnail: {
                url: userStats.iconurl
            },
            fields: feilds,
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.tag
            }
        }
    }
}

exports.generateImageCard = (msg, title, url) => {
    return {
        embed: {
            color: 6697881,
            title: "image link",
            url: url,
            author: {
                name: title
            },
            image: {
                url: url
            },
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.tag
            }
        }
    }
}