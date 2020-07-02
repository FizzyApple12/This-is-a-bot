const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, args, stat, music) {
    messageSanitizer.sendChannel(msg, "Toggled repeat to " + music.toggleRepeat());
}

exports.info = {
    name: 'repeat',
    usage: 'repeat',
    description: 'Toggles the option to repeat the current song.',
    category: "music"
};