const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const math = require('mathjs');
const parser = math.parser();

exports.run = function (bot, msg, args) {
    console.log(msg.author.tag + " derived: " + args[2] + " using var: " + msg.content.substring(8)[0])
    try {
        var answer = math.derivative(args[2], args[1]);
        if (answer) {
            messageUtils.reply(msg, "the derivative of ``" + args[2] + "`` using variable ``" + args[1] + "`` is ``" + answer + "``");
        } else {
            messageUtils.reply(msg, "Hmmm... " + args[2] + " does not appear to be a valid expression...");
        }
    } catch (e) {
        messageUtils.reply(msg, "Hmmm... " + args[2] + " does not appear to be a valid expression...");
    }
}

exports.info = {
    name: 'derive',
    usage: 'derive "[variable]" "[expression]"',
    description: 'Finds the symbolic derivative of an expression',
    category: "math"
};