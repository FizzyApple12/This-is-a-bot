const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    if (!args[1]) return messageSanitizer.sendChannel(msg, "You must provide an id to get.")
    console.log(msg.author.tag + " asked for a picture with id " + args[1] + " from Giphy");
    var query = args[1];
    request('http://api.giphy.com/v1/gifs/' + query + '?api_key=ox196Ej6TcRtsGmP6ICDAXyPVepRytuk', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            messageSanitizer.reply(msg, "Giphy gif with id: " + args[1], {
                file: info.data.images.original.url,
            });
        } else if (!error && response.statusCode == 404) {
            messageSanitizer.reply(msg, "404 not found. Please check your Giphy ID and try again");
        }
    });
}

exports.info = {
    name: 'giphyid',
    usage: 'giphyid "[id]"',
    description: 'Returns a gif with specified id from giphy',
    category: "images"
};