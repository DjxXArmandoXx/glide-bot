//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require('../../models/suggestions-model.js');
const moment = require('moment');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args, prefix) {
  const channel = await schema.findOne({guildid: message.guild.id});
  if(!channel || !client.channels.cache.get(channel.channelid)) return message.reply("No hay ningun de sugerencias para este servidor, o ha sido eliminado. (para solucionarlo escribe: `"+prefix+"set-suggest`)");
  const suggest = args.join(' ');
  const embedSuggest = new MessageEmbed()
  .setTitle("Nueva sugerencia")
  .addField("Autor", `\`${message.author.tag}\``)
  .addField("Fecha", `\`${moment(Date.now()).format('DD/MM/YYYY HH:mm A')}\``)
  .addField("Sugerencia", `\`${suggest}\``);

  message.guild.channels.cache.get(channel.channelid).send({ embeds: [embedSuggest]}).then(msg => {
    msg.react('✅');
    msg.react('❌');
  });
  message.reply("Tu sugerencia ha sido enviada con exito.");
};

module.exports.help = {
name: "suggest", //-- command name
aliases: ["sugerir"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 60, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<sugerencia>", //-- command usage
description: "Sugiere algo para el servidor", //-- command description

}