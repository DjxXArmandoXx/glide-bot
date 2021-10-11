//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const simpledjs = require('simply-djs');
//-- variables

//-- others

//-- command
module.exports.run = async function(client, message, args) {
    simpledjs.tictactoe(message, {
        xEmoji: '❌', //default: ❌
        oEmoji: '⭕', //default: ⭕
        idleEmoji: '➖', //default: ➖
        embedColor: '#075FFF', //default: #075FFF
        embedFoot: 'Suerte!' //default: 'Make sure to win ;)' 
    });
}

module.exports.help = {
    name: "ttt", //-- command name
    aliases: ["tictactoe"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 10, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<@oponente>", //-- command usage
    description: "Juego al tres en raya (tic tac toe)", //-- command description

}