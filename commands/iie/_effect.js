const Discord = module.require("discord.js");
const config = module.require('../../config.json');
var request = require('request');
var fs = require('fs');
const messageUtils = module.require('../../messageUtils.js');

exports.run = function (callback, bot, msg, args, IIE) {
    var found = false;
    var foundIndex = 0;
    IIE.userImages.forEach((userImage, i) => {
        if (userImage.userid == msg.author.id) {
            found = true;
            foundIndex = i;
        } 
    });

    if (!found) {
        messageUtils.reply(msg, "Could not find an image selected by you, please use ``$$$image`` with an attached image to select one.");
        return;
    }

    var effect = IIE.effects.find(effectI => effectI.info.name === args[1]);

    if (!effect) {
        messageUtils.reply(msg, `Could not find the effect named "${args[1]}"`);
        return;
    }

    var fileName = IIE.makeImageid();
    
    var folderpath = `${appRoot}/innerImageEditor/imagecache/`;

    if (!fs.existsSync(folderpath)) fs.mkdirSync(folderpath);

    var filepath = `${folderpath}${fileName}.${IIE.userImages[foundIndex].image.split('.')[IIE.userImages[foundIndex].image.split('.').length - 1]}`
    var effectargs = args;
    effectargs.shift();
    effectargs.shift();

    request.head(IIE.userImages[foundIndex].image, (err, res, body) => {
        request(IIE.userImages[foundIndex].image).pipe(fs.createWriteStream(filepath)).on('close', () => {
            effect.apply(filepath, effectargs, e => {
                if (e) { 
                    console.log(e);
                    messageUtils.reply(msg, `Failed to edit image:\n\`\`\`${e}\`\`\``);
                    fs.unlinkSync(filepath);
                    return;
                }
                messageUtils.reply(msg, "Here is the edited image.", { 
                    files: [
                        filepath
                    ] 
                }).then(msg2 => {
                    IIE.userImages.forEach((userImage, i) => {
                        if (userImage.userid == msg.author.id) IIE.userImages[i].image = msg2.attachments.first().url;
                    });
                    fs.unlinkSync(filepath);
                    callback();
                });
            });
        });
    });
}

exports.info = {
    name: '$$effect',
    usage: '$$effect [name] {effect arguments}',
    description: 'Applies an effect to your image.',
    category: "image editing"
};