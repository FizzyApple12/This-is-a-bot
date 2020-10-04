const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    console.log(msg.author.tag + " asked for a dog picture");
    request('https://api.thedogapi.com/v1/images/search', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            let url = info[0].url;
            messageUtils.sendChannel(msg, "", messageUtils.generateImageCard(msg, `Here is a dog!`, url));
        }
    });
}

exports.info = {
    name: 'dog',
    usage: 'dog',
    description: 'Returns a picture of a dog',
    category: "images"
};
