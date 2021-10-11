//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { defaultPrefix } = require('../configs/config.json');

//-- variables

//-- event
module.exports = async (client, guild) =>{
    let defaultChannel = "";
    guild.channels.cache.forEach(channel => {
        if(channel.type === "GUILD_TEXT" && defaultChannel === "") defaultChannel = channel;
  });
  
  const embedSuccess = new MessageEmbed()
  .setDescription("Hola, soy **"+client.user.username+"**, Para ver todos mis comandos escribe `"+defaultPrefix+"help`")
  .setColor("RANDOM")
  .setFooter("Espero ayudarte!")
  .setTimestamp();

  //defaultChannel.send({embeds: [embedSuccess]});
};