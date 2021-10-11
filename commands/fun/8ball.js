//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { principalDev } = require('../../configs/config.json');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  let responses = ["Si", "Definitivamente si", "No", "Definitivamente no", "Tu lo sabes"];
  let randomResponses = responses[Math.floor(Math.random() * responses.length)];
  let img;
  if(message.author.id === principalDev) {
      responses = ["Si", "Definitivamente si"];
      randomResponses = responses[Math.floor(Math.random() * responses.length)];
  }

  if(randomResponses === "Definitivamente si") {
      img = 'https://share.creavite.co/EcXADLCrlxhp5iLU.gif';
  } else if(randomResponses === "No") {
      img = 'https://share.creavite.co/z9qnC2sOJQf3wENA.gif';
  } else if(randomResponses === "Definitivamente no") {
      img = 'https://share.creavite.co/lGcRemv67e6BGJH4.gif';
  } else if(randomResponses === "Tu lo sabes"){
      img = 'https://share.creavite.co/YzaTSKj6W4tpwTvF.gif';
  } else {
      img = 'https://share.creavite.co/yfFf95aRXPJjRyDl.gif';
  };

  const imgSuccess = new Discord.MessageAttachment(img, "response.gif");
  const embedSuccess = new MessageEmbed()
      .setTitle(`🎱 **${message.author.username} pregunta...** 🎱 `)
      .setDescription(`**Pregunta**: ${args.join(" ")}\n\n**Respuesta:** ${randomResponses}`)
      .setThumbnail('https://cdn.dribbble.com/users/264259/screenshots/1860410/attachments/313225/8-ball.gif')
      .setImage('attachment://response.gif')
      .setColor("RANDOM")
      .setFooter(`${message.author.username}`, message.author.avatarURL())
      .setTimestamp();
      message.reply({ embeds: [embedSuccess], files: [imgSuccess] });

};

module.exports.help = {
name: "8ball", //-- command name
aliases: ["bola8"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<pregunta>", //-- command usage
description: "Pregunta lo que sea y la bola 8 te respondera", //-- command description

}