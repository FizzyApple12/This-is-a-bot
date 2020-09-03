const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, args) {
    console.log(args)
    if (!args[1] || !args[1].match(/<(a|):.+:/)) return messageSanitizer.sendChannel(msg, 'That is not a valid emote')

    let processedEmote = args[1].replace(/<(a|):.+:/, '')
    processedEmote = processedEmote.replace('>', '')
    
    let emote = bot.emojis.find('id', processedEmote);

    if (emote) messageSanitizer.sendChannel(msg, emote.url);
    else messageSanitizer.sendChannel(msg, 'Could not find that emote.');
}

exports.info = {
    name: 'emote',
    usage: 'emote [emote]',
    description: 'Sends the full image of an emote',
    category: "images"
};