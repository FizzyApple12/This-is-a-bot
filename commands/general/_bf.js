const message = require("../../programLogic/events/message");
 
const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');
 
const runBrainfuckCode = async (code, callback) => {
    var memory = [];
    var pointer = 0;
    var infiniteCheck = 0;
    var output = "";
    var jsSourceCode = '';

    for (var i = 0; i < code.length; i++) {
        const currBfInstr = code.charAt(i);

        switch (currBfInstr) {
            case '>':
                jsSourceCode += 'pointer++;';
                break;
            case '<':
                jsSourceCode += 'pointer--;';
                break;
            case '+':
                jsSourceCode += 'if (!memory[pointer]) memory[pointer] = 0; memory[pointer] += 1;';
                break;
            case '-':
                jsSourceCode += 'if (!memory[pointer]) memory[pointer] = 0; memory[pointer] -= 1;';
                break;
            case '.':
                jsSourceCode += 'output += String.fromCharCode(memory[pointer]);';
                break;
            case ',':
                // jsSourceCode += 'memory[pointer] = readline.question().charCodeAt(0);';
                // disable input as this has no way of being done as of now
                break;
            case '[':
                jsSourceCode += 'while(memory[pointer]) {';
                break;
            case ']':
                jsSourceCode += `infiniteCheck++; if (infiniteCheck >= 500) break; }`;
                break;
            default:
        }
    }

    eval(jsSourceCode)

    callback(output);
}

exports.run = async function (bot, msg, args) {
    runBrainfuckCode(args[1], output => {
        messageUtils.sendChannel(msg, " " + output);
    });
}
 
exports.info = {
    name: 'bf',
    usage: 'bf "[code]"',
    description: 'Runs code throught the Brainfuck interpreter.',
    category: "general"
};