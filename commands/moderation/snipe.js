//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const msg = client.snipes.get(message.channel.id);

  if(!msg) return message.reply('No hay ningún mensaje borrado.');
  else {
      message.reply({embeds: [new MessageEmbed().setDescription(`**autor:** \`${msg.delete.tag}\`\n**Contenido:** \`${msg.content}\``).setColor('RANDOM').setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))]});
  }
};

module.exports.help = {
name: "snipe", //-- command name
aliases: [], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Ver el ultimo mensaje borrado en el canal actual", //-- command description

}