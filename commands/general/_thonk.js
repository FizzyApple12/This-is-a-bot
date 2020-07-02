const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');

exports.run = function (bot, msg, argimage) {
    msg.delete();
    messageSanitizer.sendChannel(msg, ":T01::T02::T03::T04::T05::T06::T07::T08:");
    messageSanitizer.sendChannel(msg, ":T01::T09::T10::T11::T12::T13::T13::T14:");
    messageSanitizer.sendChannel(msg, ":T15::T16::T17::T18::T13::T19::T20::T21::T22:");
    messageSanitizer.sendChannel(msg, ":T23::T13::T24::T25::T13::T26::T27::T13::T28:");
    messageSanitizer.sendChannel(msg, ":T29::T13::T30::T31::T32::T33::T13::T13::T34:");
    messageSanitizer.sendChannel(msg, ":T35::T36::T37::T38::T39::T40::T41::T42::T43:");
    messageSanitizer.sendChannel(msg, ":T01::T44::T45::T46::T47::T48::T49::T50:");
    messageSanitizer.sendChannel(msg, ":T01::T51::T52::T52::T53::T54::T55::T56:");
    messageSanitizer.sendChannel(msg, ":T01::T57::T58::T59::T60:");
}

exports.info = {
    name: 'thonk',
    usage: 'thonk',
    description: 'Puts a big thonk emoji in chat',
    category: "images"
};

/*
:T01::T02::T03::T04::T05::T06::T07::T08:
:T01::T09::T10::T11::T12::T13::T13::T14:
:T15::T16::T17::T18::T13::T19::T20::T21::T22:
:T23::T13::T24::T25::T13::T26::T27::T13::T28:
:T29::T13::T30::T31::T32::T33::T13::T13::T34:
:T35::T36::T37::T38::T39::T40::T41::T42::T43:
:T01::T44::T45::T46::T47::T48::T49::T50:
:T01::T51::T52::T52::T53::T54::T55::T56:
:T01::T57::T58::T59::T60:
 */
