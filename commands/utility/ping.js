//-- modules
const Discord = require('discord.js');
// const disbut = require('discord-buttons');

//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    message.channel.send({embeds: [new Discord.MessageEmbed().setDescription(`**Mi ping Actual es de** \`${client.ws.ping}\` **ms**`).setColor("RANDOM")]});

};
    

module.exports.help = {
    name: "ping", //-- command name
    aliases: [], //-- command aliases
    guildOnly: false, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 0, //-- command cooldown
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "Muestra la latencia del bot", //-- command description
}