//-- modules
const Discord = require('discord.js');
//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    var position = message.channel.position;
  let reason = args.join(" ") || "sin razon";

  if(!message.channel.deletable) {
      return message.channel.send("El canal no se puede nukear");
  }
  const member = message.member;
  let newChannel = message.channel.clone().then((canal) => {
      message.channel.delete();

      canal.setPosition(position);
    
  let embed = new Discord.MessageEmbed()
  .setTitle("Canal Nukeado")
  .setDescription(`canal nukeado por: **${member.user.tag}**\nRazón: **${reason}**`)
  .setImage("https://cdn.discordapp.com/attachments/786627691267751976/787745289523691541/6c485efad8b910e5289fc7968ea1d22f.gif")
  .setColor("RANDOM")
  .setTimestamp();

  canal.send({embeds: [embed]});
  })
}

module.exports.help = {
    name: "nuke", //-- command name
    aliases: ["nukear"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    permissions: ["MANAGE_CHANNELS"], //--command permissions
    cooldown: 60, //-- command cooldown
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<razón (opcional)>", //-- command usage
    description: "Elimina todos los mensajes de un canal", //-- command description
}