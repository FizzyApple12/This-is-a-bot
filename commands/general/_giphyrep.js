const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    if (!args[1]) return messageUtils.sendChannel(msg, "You must provide tags to search by.")
    console.log(msg.author.tag + " asked for a picture with serch " + args[1] + " rephrased to hell from Giphy");
    var query = args[1].replace(/ /g, '+');
    request('http://api.giphy.com/v1/gifs/translate?s=' + query + '&api_key=ox196Ej6TcRtsGmP6ICDAXyPVepRytuk&weirdness=10', (error, response, body) => {
        try {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                let url = info.data.images.original.url;
                messageUtils.sendChannel(msg, "", messageUtils.generateImageCard(msg, `Giphy search for "${args[1]}" with weirdness of 10`, url));
            }
        } catch (e) {
            messageUtils.reply(msg, "Could not find any images with query " + args[1]);
        }
    });
}

exports.info = {
    name: 'giphyno',
    usage: 'giphyno "[search query]"',
    description: 'Returns a gif from giphy that has been rephrased to hell by giphy',
    category: "images"
};