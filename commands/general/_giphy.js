const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    if (!args[1]) return messageUtils.sendChannel(msg, "You must provide tags to search by.")
    console.log(msg.author.tag + " asked for a picture about " + args[1] + " from Giphy");
    var query = args[1].replace(/ /g, '+');
    request('http://api.giphy.com/v1/gifs/random?tag=' + query + '&api_key=ox196Ej6TcRtsGmP6ICDAXyPVepRytuk', (error, response, body) => {
        try {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                let url = info.data.images.original.url;
                messageUtils.sendChannel(msg, "", messageUtils.generateImageCard(msg, `Giphy search for: "${args[1]}"`, url));
            }
        } catch (e) {
            messageUtils.reply(msg, "Could not find any images with query " + args[1]);
        }
    });
}

exports.info = {
    name: 'giphy',
    usage: 'giphy "[search query]"',
    description: 'Returns a gif from giphy',
    category: "images"
};