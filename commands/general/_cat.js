const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    console.log(msg.author.tag + " asked for a cat picture");
    request('https://api.thecatapi.com/v1/images/search', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            /*messageSanitizer.reply(msg, "Here is a cat!", {
                file: info[0].url,
            });*/
	        messageSanitizer.reply(msg, `Here is a cat!\n${info[0].url}`);
        }
    });
}

exports.info = {
    name: 'cat',
    usage: 'cat',
    description: 'Returns a picture of a cat',
    category: "images"
};
