const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args) {
    messageUtils.sendChannel(msg, config.githubURL);
}

exports.info = {
    name: 'github',
    usage: 'github',
    description: 'Gets the URL for the GitHub repository for the bot.',
    category: "general"
};