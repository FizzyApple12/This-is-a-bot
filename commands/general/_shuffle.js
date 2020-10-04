const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stat, music) {
    messageUtils.sendChannel(msg, "Toggled shuffle to " + music.toggleShuffle());
}

exports.info = {
    name: 'shuffle',
    usage: 'shuffle',
    description: 'Toggles the option to shuffle the songs in the queue.',
    category: "music"
};