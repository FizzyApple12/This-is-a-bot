const Discord = module.require("discord.js");
const config = module.require('../../config.json');
var fs = require('fs');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, args) {
    var path = "";
    var lineS = null;
    var lineE = null;

    if (args[1]) {
        path = `${appRoot}/${args[1]}`;
        path = path.replace(/\\/g, "/");
    } else {
        messageSanitizer.reply(msg, "You must specify a file to read.")
        return;
    }

    if (path.includes("configPrivate")) {
        messageSanitizer.reply(msg, "configPrivate.json contains sensitive data and cannot be read.")
        return;
    }

    if (path.includes("/.") || path.includes("/..") || path.includes("~")) {
        messageSanitizer.reply(msg, "Cannot use relative symbols for security reasons.");
        return;
    }

    var data;
    try {
        data = fs.readFileSync(path, 'utf8')
    } catch (e) {
        messageSanitizer.reply(msg, `Could not find file: \`\`${path}\`\``)
        return;
    }
    var lines = data.split("\n");
    var code = "";

    if (!isNaN(args[2]) && !isNaN(args[3])) {
        lineS = parseInt(args[2]);
        lineE = parseInt(args[3]);

        if (lineS - 1 > lines.length || lineE > lines.length) {
            messageSanitizer.reply(msg, 'Start line and end line must be less than the file length');
            return;
        }
    
        if (lineS - 1 > lineE) {
            messageSanitizer.reply(msg, 'Start line must be less than the end line');
            return;
        }
    }

    if (!isNaN(args[2]) && !isNaN(args[3])) {
        messageSanitizer.sendChannel(msg, `Reading: \`\`${path}\`\` from line ${lineS} to line ${lineE}`);
        for (var i = lineS - 1; i < lineE; i++) {
            if (i >= lines.length) continue;
            code += lines[i] + "\n";
        }
    } else {
        messageSanitizer.sendChannel(msg, `Reading: \`\`${path}\`\``);
        lines.forEach(line => {
            code += line + "\n";
        });
    }
    msg.channel.sendCode('js', code, { split: true });
}

exports.info = {
    name: 'code',
    usage: 'code "[path relative to the bot\'s root directory]" {start} {end}',
    description: 'Reads the code from a file of a bot.',
    category: "debugging"
};
