const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    if (!args[1]) return messageUtils.sendChannel(msg, "You must provide an id to get.")
    console.log(msg.author.tag + " asked for a picture with id " + args[1] + " from Giphy");
    var query = args[1];
    request('http://api.giphy.com/v1/gifs/' + query + '?api_key=ox196Ej6TcRtsGmP6ICDAXyPVepRytuk', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            let url = info.data.images.original.url;
            messageUtils.sendChannel(msg, "", messageUtils.generateImageCard(msg, `Giphy gif with ID "${args[1]}"`, url));
        } else if (!error && response.statusCode == 404) {
            messageUtils.reply(msg, "404 not found. Please check your Giphy ID and try again");
        }
    });
}

exports.info = {
    name: 'giphyid',
    usage: 'giphyid "[id]"',
    description: 'Returns a gif with specified id from giphy',
    category: "images"
};