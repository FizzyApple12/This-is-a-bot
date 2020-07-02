const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    console.log(msg.author.tag + " asked for a trending gif from Giphy");
    request('http://api.giphy.com/v1/gifs/trending?api_key=ox196Ej6TcRtsGmP6ICDAXyPVepRytuk&limit=100', (error, response, body) => {
        try {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body);
                messageSanitizer.reply(msg, "Giphy trending gif: ", {
                    file: info.data[Math.floor(Math.random() * (info.data.length - 1))].images.original.url,
                });
            }
        } catch (e) {
            messageSanitizer.reply(msg, "Could not find any images with query " + args[1]);
        }
    });
}

exports.info = {
    name: 'giphytrend',
    usage: 'giphytrend',
    description: 'Returns a tranding gif from giphy',
    category: "images"
};