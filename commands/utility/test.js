//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

//-- command
module.exports.run = async function(client, message, args) {
    message.channel.send('asd');
};

module.exports.help = {
    name: "tes", //-- command name
    aliases: [], //-- command aliases
    guildOnly: false, //-- command guild only
    dmOnly: true, //-- command dm only //-- command permissions
    inactive: true, //-- command inactive
    cooldown: 0, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<valor> | <comentario (opcional)>" //-- command usage

}