const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

//var Furry = require('e621');
//var e621 = new Furry();

const request = module.require("request");

exports.run = async function (bot, msg, args, stat, music, serverPrefs) {
    if (args[1] == undefined) {
        messageUtils.reply(msg, "You must provide at least one tag to search by.")
        return;
    }

    var currentServerConfig = await serverPrefs.findOne({ id: msg.guild.id });

    if (currentServerConfig) {
        if(!currentServerConfig.config.nsfw.allow) {
            messageUtils.reply(msg, "NSFW is disabled in this server.");
            return;
        }
        if (currentServerConfig.config.nsfw.setChannel && msg.channel.id != currentServerConfig.config.nsfw.channelid) {
            messageUtils.reply(msg, `You must use NSFW commands in <#${currentServerConfig.config.nsfw.channelid}>`);
            return;
        }
    }
    console.log(msg.author.tag + " asked for e621 with tags: " + args[1]);
    
    var query = args[1].replace(/ /g, "+");
    request({ 
        url: 'https://www.e621.net/posts.json?tags=' + query,
        headers: {
            "User-Agent": "FizzyApple12/ThisIsABot"
        }
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var reply = JSON.parse(body).posts;
            if (reply.length == 0) {
                messageUtils.reply(msg, "Found no results with tags: " + args[1])
                return;
            }
            var randomNum = Math.floor(Math.random() * reply.length);
            // console.log(randomNum)
            // console.log(reply[randomNum].file.url)
            
            let url = reply[randomNum].file.url;
            messageUtils.sendChannel(msg, "", messageUtils.generateImageCard(msg, `e621 image with tags "${args[1]}"`, url));
        }
    });
}

exports.info = {
    name: 'e621',
    usage: 'e621 "[tags]"',
    description: 'Grabs an image off of e621.net',
    category: "images"
};