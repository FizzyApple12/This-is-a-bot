const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const math = require('mathjs');
const parser = math.parser();

exports.run = function (bot, msg, args) {
    console.log(msg.author.tag + " rationalized: " + args[1])
    try {
        var answer = math.rationalize(args[1]);
        if (answer) {
            messageUtils.reply(msg, "``" + args[1] + "`` rationalizes to ``" + answer + "``");
        } else {
            messageUtils.reply(msg, "Hmmm... " + args[1] + " does not appear to be a valid expression...");
        }
    } catch (e) {
        messageUtils.reply(msg, "Hmmm... " + args[1] + " does not appear to be a valid expression...");
    }
}

exports.info = {
    name: 'ration',
    usage: 'ration "[expression]"',
    description: 'Transforms a rationalizable expression in a rational fraction',
    category: "math"
};