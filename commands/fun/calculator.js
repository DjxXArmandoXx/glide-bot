//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const simpleds = require("simply-djs");

//-- variables

//-- others

//-- command
module.exports.run = async function(client, message, args) {
    simpleds.calculator(message, {
        embedColor: 'RANDOM',
    });
}

module.exports.help = {
    name: "calculadora", //-- command name
    aliases: ["calc", "calculator"], //-- command aliases
    guildOnly: false, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 10, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "abre una calculadora en discord", //-- command description

}