//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { baka } = require('../../helpers/gifs.js');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const mention = message.mentions.members.first();
    if(!mention) return message.reply('Debes mencionar un usuario valido!');

    message.reply({embeds: [
        new MessageEmbed()
        .setTitle(message.author.username+' le ha dicho idiota a '+mention.user.username)
        .setImage(baka[Math.floor(Math.random() * baka.length)])
        .setColor('RANDOM')
        .setFooter(message.author.username, message.author.avatarURL())
        .setTimestamp()
    ]});
};

module.exports.help = {
name: "baka", //-- command name
aliases: ["idiota"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 10, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario>", //-- command usage
description: "Dile idiota a un usuario", //-- command description

}