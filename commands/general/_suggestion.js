const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args) {
    messageUtils.sendChannel(msg, "```" + args[1] + "```").then(newMsg => {
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