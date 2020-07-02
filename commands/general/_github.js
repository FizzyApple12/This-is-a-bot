const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, args) {
    messageSanitizer.sendChannel(msg, config.githubURL);
}

exports.info = {
    name: 'github',
    usage: 'github',
    description: 'Gets the URL for the GitHub repository for the bot.',
    category: "general"
};