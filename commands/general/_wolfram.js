const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

const request = require("request");

exports.run = function (bot, msg, args) {
    console.log(`${msg.author.tag} asked wolfram: ${args[1]}`);
    var question = args[1].replace(/ /g, '+');

    request(`http://api.wolframalpha.com/v1/simple?appid=5XU3UL-QY574TGQRP&i=${question}%3F`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            messageSanitizer.reply(msg, `http://api.wolframalpha.com/v1/simple?appid=5XU3UL-QY574TGQRP&i=${question}%3F`);
        } else {
            messageSanitizer.reply(msg, body);
        }
    });
}

exports.info = {
    name: 'wolfram',
    usage: 'wolfram "[question]"',
    description: 'Runs question through wolfram',
    category: "math"
};