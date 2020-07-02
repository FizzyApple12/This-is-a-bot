const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

const math = require('mathjs');
const parser = math.parser();

exports.run = function (bot, msg, args) {
    console.log(msg.author.tag + " rationalized: " + args[1])
    try {
        var answer = math.rationalize(args[1]);
        if (answer) {
            messageSanitizer.reply(msg, "``" + args[1] + "`` rationalizes to ``" + answer + "``");
        } else {
            messageSanitizer.reply(msg, "Hmmm... " + args[1] + " does not appear to be a valid expression...");
        }
    } catch (e) {
        messageSanitizer.reply(msg, "Hmmm... " + args[1] + " does not appear to be a valid expression...");
    }
}

exports.info = {
    name: 'ration',
    usage: 'ration "[expression]"',
    description: 'Transforms a rationalizable expression in a rational fraction',
    category: "math"
};