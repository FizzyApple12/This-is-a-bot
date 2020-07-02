const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (callback, bot, msg, args, IIE) {
    if (msg.attachments.size == 1) {
        var found = false;
        IIE.userImages.forEach((userImage, i) => {
            if (userImage.userid == msg.author.id) {
                IIE.userImages[i].image = msg.attachments.first().url;
                found = true;
            }
        });

        if (!found) IIE.userImages.push({"userid": msg.author.id, "image": msg.attachments.first().url});
        messageSanitizer.reply(msg, "Registered your image!")
    } 
    else if (msg.attachments.size > 1) messageSanitizer.reply(msg, "Found too many images, please try again with only 1 image attached.");
    else if (msg.attachments.size < 1) messageSanitizer.reply(msg, "Didn't find any images in your request, please try again with an attached image.");
    callback();
}

exports.info = {
    name: '$$image',
    usage: '$$image',
    description: 'Loads and attached image in to IIE.',
    category: "image editing"
};