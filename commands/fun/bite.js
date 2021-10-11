//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { bite } = require('../../helpers/gifs.js');

//--command
module.exports.run = async function(client, message, args) {
    const mention = message.mentions.members.first();
    if(!mention) return message.reply('Debes mencionar un usuario valido');
    let msg = `${message.author.username} a mordido a ${mention.user.username}`;
    if(mention.user.id === message.author.id) msg = `${message.author.username} se ha mordido a si mismo, ta raro`;

    message.reply({embeds: [
        new MessageEmbed()
        .setTitle(msg)
        .setImage(bite[Math.floor(Math.random() * bite.length)])
        .setColor('RANDOM')
        .setFooter(message.author.username, message.author.avatarURL())
        .setTimestamp()
    ]});
};

module.exports.help = {
name: "bite", //-- command name
aliases: ["morder"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 5, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario>", //-- command usage
description: "Muerte a un usuario", //-- command description

}