const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    if (!args[1]) return messageUtils.sendChannel(msg, "You must provide tags to search by.")
    console.log(msg.author.tag + " searched for a picture with query " + args[1] + " from Imgur");
    var query = args[1].replace(/ /g, '+');
    request({ url: 'https://api.imgur.com/3/gallery/search?q=' + query, headers: { 'Authorization': 'Client-ID 9b737057c864c9b' } }, (error, response, body) => {
        try {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                let url = info.data[0].images[0].link;
                messageUtils.sendChannel(msg, "", messageUtils.generateImageCard(msg, `Imgur search "${args[1]}"`, url));
            }
        } catch (e) {
            messageUtils.reply(msg, "Could not find any images with query " + args[1]);
        }
    });
}

exports.info = {
    name: 'imgurtop',
    usage: 'imgurtop "[query]"',
    description: 'Returns the top imgur result using the specified query',
    category: "images"
};