const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, args) {
    messageSanitizer.sendChannel(msg, "```" + args[1] + "```").then(newMsg => {
        newMsg.react('📕');
        newMsg.react('📗');
    });
}

exports.info = {
    name: 'suggest',
    usage: 'suggest "[suggestion]"',
    description: 'Creates a suggestion for the bot',
    category: "general"
};