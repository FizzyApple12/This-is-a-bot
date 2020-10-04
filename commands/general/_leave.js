const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args, stat, music) {
    music.leave();
}

exports.info = {
    name: 'leave',
    usage: 'leave',
    description: 'Leaves the current music channel',
    category: "music"
};