//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/warn-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const mention = message.mentions.members.first();
  if(!schema.findOne({guildId: message.guild.id, userId: mention.user.id})) return message.reply("Este usuario no tiene sanciones en este servidor!");


  
  
  const msg = `Estas seguro que quieres eliminar todas las sanciones de **${mention.user.tag}**?`;
  
  const accept = new Discord.MessageButton()
  .setLabel("continuar")
  .setCustomId("accept")
  .setStyle("SUCCESS");
  
  const cancel = new Discord.MessageButton()
  .setLabel("cancelar")
  .setCustomId("cancel")
  .setStyle("DANGER");
  
  let row = new Discord.MessageActionRow()
  .addComponents(accept, cancel);
  const results = await schema.findOne({
    guildId: message.guild.id,
    userId: mention.user.id
});
if(!results) return message.reply("Este usuario no tiene sanciones en este servidor!");
  const embedFin = new MessageEmbed()
  .setDescription(`**Todas las Sanciones de ese usuario han sido eliminadas**\n**INFO:**\n**NOMBRE DEL USUARIO:** \`${mention.user.username}\`\n**DISCRIMINADOR DEL USUARIO:** \`${mention.user.discriminator}\`\n**TAG DEL USUARIO:** \`${mention.user.tag}\``)
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter(`${message.author.username}`, message.author.displayAvatarURL());

  let sendmsg = await message.reply({content: msg,components: [row]});
  const filter = b => b.user.id === message.author.id;
  const collector = sendmsg.channel.createMessageComponentCollector(filter, {time: 60000}); 
  collector.on('collect', async(b) => {
      if(b.message.id !== sendmsg.id) return;
    if(b.user.id !== message.author.id) return b.reply({content: "Solo el que puso el comando puede interactuar con el mismo!", ephemeral: true});
    if(b.customId == 'accept'){
        b.deferUpdate();
        await schema.findOneAndDelete({guildId: message.guild.id, userId: mention.user.id});
        await sendmsg.delete();
        await message.channel.send({embeds: [embedFin]});
    }
    if(b.customId == 'cancel'){
        b.deferUpdate();
        b.message.delete();
    }
  });
};

module.exports.help = {
name: "clear-warnings", //-- command name
aliases: ["clear-sanction", "borrar-sanciones"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
permissions: ["ADMINISTRATOR"], //-- command permissions
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario>", //-- command usage
description: "Elimina todas las sanciones de un usuario", //-- command description

}