const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

const math = require('mathjs');
const parser = math.parser();

exports.run = function (bot, msg, args) {
    console.log(msg.author.tag + " solved: " + args[1])
    try {
        var answer = parser.eval(args[1]);
        if (answer) {
            if (typeof answer === 'number') {
                messageSanitizer.reply(msg, "``" + args[1] + "`` = ``" + answer + "``");
            } else {
                messageSanitizer.reply(msg, "expression provided successfully executed");
            }
        } else {
            messageSanitizer.reply(msg, "Hmmm... " + args[1] + " does not appear to be a valid expression...");
        }
    } catch (e) {
        messageSanitizer.reply(msg, "Hmmm... " + args[1] + " does not appear to be a valid expression...");
    }
}

exports.info = {
    name: 'solve',
    usage: 'solve "[math equation]"',
    description: 'Solves a math equation',
    category: "math"
};