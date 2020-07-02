const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, args, stat, music, serverPrefs, loadReact, IIE) {
    try {
        var result = eval(args[1]);
        if (result) messageSanitizer.sendChannel(msg, `CODE EXECUTION:\nFNISHED\`\`\`${result}\`\`\``);
        else messageSanitizer.sendChannel(msg, "CODE EXECUTION:\nFINISHED\n[no result]");
    } catch (e) {
        messageSanitizer.sendChannel(msg, `CODE EXECUTION:\nERROR\`\`\`${e}\`\`\``);
    }
}

exports.info = {
    name: 'run',
    usage: 'run [code]',
    description: 'Runs JS code',
    category: null
};
