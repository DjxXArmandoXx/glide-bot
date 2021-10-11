//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { angry } = require('../../helpers/gifs.js');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  message.reply({embeds: [
      new MessageEmbed()
      .setTitle(message.author.username+' Esta enojado')
      .setImage(angry[Math.floor(Math.random() * angry.length)])
      .setColor('RANDOM')
      .setFooter(message.author.username, message.author.avatarURL())
      .setTimestamp()
  ]});
};

module.exports.help = {
name: "enojado", //-- command name
aliases: ["angry"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Demuestra que estas enojado", //-- command description
}