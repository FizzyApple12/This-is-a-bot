const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (callback, bot, msg, args, IIE) {
    if (args.length >= 2) {
        // if (!args[1].match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\b([/|.|\w|\s|-])*\.(?:jpg|gif|png))/)) {
        //     messageSanitizer.reply(msg, "Couldn't find a valid URL, please list one with this command.");
        //     return;
        // }
        var found = false;
        IIE.userImages.forEach((userImage, i) => {
            if (userImage.userid == msg.author.id) {
                IIE.userImages[i].image = arg[1];
                found = true;
            }
        });

        if (!found) IIE.userImages.push({"userid": msg.author.id, "image": arg[1]});
        messageSanitizer.reply(msg, "Registered your image!")
    } 
    else if (args.length < 2) messageSanitizer.reply(msg, "Couldn't find your URL, please list one with this command.");
    callback();
}

exports.info = {
    name: '$$imageurl',
    usage: '$$imageurl [URL of image]',
    description: 'Loads an image in to IIE by URL.',
    category: "image editing"
};