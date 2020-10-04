const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    if (!args[1]) return messageUtils.sendChannel(msg, "You must provide tags to search by.")
    console.log(msg.author.tag + " searched for a random picture with query " + args[1] + " from Imgur");
    var query = args[1].replace(/ /g, '+');
    request({ url: 'https://api.imgur.com/3/gallery/search?q=' + query, headers: { 'Authorization': 'Client-ID 9b737057c864c9b' } }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            try {
                var info = JSON.parse(body);
                let url = info.data[Math.floor(Math.random() * (info.data.length - 1))].images[0].link;
                messageUtils.sendChannel(msg, "", messageUtils.generateImageCard(msg, `Imgur picture with query "${args[1]}"`, url))
            } catch (e) {
                console.log(e)
                messageUtils.reply(msg, `Could not find any images with query "${args[1]}"`);
            }
        }
    });
}

exports.info = {
    name: 'imgur',
    usage: 'imgur "[query]"',
    description: 'Returns a random imgur result using the specified query',
    category: "images"
};