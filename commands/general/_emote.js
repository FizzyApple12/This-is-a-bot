const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (bot, msg, args) {
    if (!args[1] || !args[1].match(/<(a|):.+:/)) return messageUtils.sendChannel(msg, 'That is not a valid emote')

    let processedEmote = args[1].replace(/<(a|):.+:/, '')
    processedEmote = processedEmote.replace('>', '')
    
    let emote = bot.emojis.find('id', processedEmote);

    if (emote) messageUtils.sendChannel(msg, emote.url);
    else messageUtils.sendChannel(msg, 'Could not find that emote.');
}

exports.info = {
    name: 'emote',
    usage: 'emote [emote]',
    description: 'Sends the full image of an emote',
    category: "images"
};