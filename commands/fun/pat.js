//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { pat } = require('../../helpers/gifs.js');

//-- variables
let mention;

//-- others

module.exports.run = async function (client, message, args) {
  //-- code
  mention = message.mentions.members.first(); //-- define mention
  if(mention.user.id == message.author.id) return message.channel.send('no puedes acariciarte a ti mismo.');
  message.reply({embeds: [
    new MessageEmbed()
    .setTitle(`${message.author.username} a acariciado a ${mention.user.username}`)
    .setImage(pat[Math.floor(Math.random() * pat.length)])
    .setColor('RANDOM')
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`)
    .setTimestamp()
  ]});
};

module.exports.help = {
  name: "pat", //-- command name
  aliases: ["acariciar"], //-- command aliases
  guildOnly: true, //-- command guild only
  dmOnly: false, //-- command dm only
  cooldown: 10, //-- command cooldown in seconds
  args: true, //-- command arguments
  minArgs: 0, //-- command minimum arguments
  maxArgs: 0, //-- command maximum arguments
  usage: "<@usuario>", //-- command usage
  description: "Acaricia a un usuario", //-- command description
};
