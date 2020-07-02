const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    if (!args[1]) return messageSanitizer.sendChannel(msg, "You must provide an id to get.")
    console.log(msg.author.tag + " asked for a picture with id " + args[1] + " from Imgur");
    var query = args[1];
    request({ url: 'https://api.imgur.com/3/image/' + query, headers: { 'Authorization': 'Client-ID 9b737057c864c9b' } }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            messageSanitizer.reply(msg, "Imgur picture with id " + args[1] + ": ", {
                file: info.data.link,
            });
        } else if (!error && response.statusCode == 404) {
            request({ url: 'https://api.imgur.com/3/gallery/' + query, headers: { 'Authorization': 'Client-ID 9b737057c864c9b' } }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    messageSanitizer.reply(msg, "Imgur gallery with id " + args[1] + ": ", {
                        file: info.data.images[0].link,
                    });
                } else if (!error && response.statusCode == 404) {
                    messageSanitizer.reply(msg, "404 not found. Please check your Imgur ID and try again");
                }
            });
        }
    });
}

exports.info = {
    name: 'imgurid',
    usage: 'imgurid "[query]"',
    description: 'Returns a picture or first image from gllery with specified id from imgur',
    category: "images"
};