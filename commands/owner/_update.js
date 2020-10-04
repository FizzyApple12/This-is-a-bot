const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const childProcess = require("child_process");
const messageUtils = module.require('../../messageUtils.js');

exports.run = async function (bot, msg, args, stat, music, serverPrefs, loadReact) {
    childProcess.execSync("git pull", { cwd: appRoot });
    await loadReact.remove();
    await msg.react(bot.emojis.get('587386664104755210'));
    childProcess.execSync("pm2 restart 0", { cwd: appRoot });
}

exports.info = {
    name: 'update',
    usage: 'update',
    description: 'Updates the software for the bot from it\'s GitHub',
    category: "general"
};