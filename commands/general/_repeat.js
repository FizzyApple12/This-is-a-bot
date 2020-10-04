const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stat, music) {
    messageUtils.sendChannel(msg, "Toggled repeat to " + music.toggleRepeat());
}

exports.info = {
    name: 'repeat',
    usage: 'repeat',
    description: 'Toggles the option to repeat the current song.',
    category: "music"
};