const message = require("../../programLogic/events/message");
 
const Discord = module.require("discord.js");
const config = module.require('../../config.json');
const messageSanitizer = module.require('../../messageSanitizer.js');
 
const runBrainfuckCode = async (code, callback) => {
    var mem_arr = [];
    var data_ptr = 0;
    var infiniteCheck = 0;
    var output = "";
    var jsSourceCode = '';

    for (var i = 0; i < code.length; i++) {
        const currBfInstr = code.charAt(i);

        switch (currBfInstr) {
            case '>':
                jsSourceCode += 'data_ptr++;';
                break;
            case '<':
                jsSourceCode += 'data_ptr--;';
                break;
            case '+':
                jsSourceCode += 'if (!mem_arr[data_ptr]) mem_arr[data_ptr] = 0; mem_arr[data_ptr] += 1;';
                break;
            case '-':
                jsSourceCode += 'if (!mem_arr[data_ptr]) mem_arr[data_ptr] = 0; mem_arr[data_ptr] -= 1;';
                break;
            case '.':
                jsSourceCode += 'output += String.fromCharCode(mem_arr[data_ptr]);';
                break;
            case ',':
                // jsSourceCode += 'mem_arr[data_ptr] = readline.question().charCodeAt(0);';
                // disable input as this has no way of being done as of now
                break;
            case '[':
                jsSourceCode += 'while(mem_arr[data_ptr]) {';
                break;
            case ']':
                jsSourceCode += `infiniteCheck++; if (infiniteCheck >= 1000) break; } infiniteCheck = 0;`;
                break;
            default:
        }
    }

    eval(jsSourceCode)

    callback(output);
}

exports.run = async function (bot, msg, args) {
    runBrainfuckCode(args[1], output => {
        messageSanitizer.sendChannel(msg, " " + output);
    });
}
 
exports.info = {
    name: 'bf',
    usage: 'bf "[code]"',
    description: 'Runs code throught the Brainfuck interpreter.',
    category: "general"
};