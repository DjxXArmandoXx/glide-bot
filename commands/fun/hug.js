//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

//-- variables
let mention;
let img;
let embed;

//-- others

module.exports.run = async function (client, message, args) {
  //-- code
  mention = message.mentions.members.first();
  if(mention.user.id == message.author.id) return message.channel.send('No te puedes abrazar a ti mismo.');
  fetch("https://some-random-api.ml/animu/hug")
    .then((res) => res.json())
    .then(async (json) => {

      embed = new MessageEmbed() //-- create new embed
        .setDescription(`** ${message.author.username}** abrazo a **${mention.user.username}**`) //-- set title to embed
        .setImage(json.link) //-- set image to embed
        .setColor("RANDOM"); //-- set color to embed

      message.channel.send({embeds: [embed]}); //-- send embed
    });
};

module.exports.help = {
  name: "hug", //-- command name
  aliases: ["abrazar", "abrazo"], //-- command aliases
  guildOnly: true, //-- command guild only
  dmOnly: false, //-- command dm only
  cooldown: 5, //-- command cooldown in seconds
  args: true, //-- command arguments
  minArgs: 0, //-- command minimum arguments
  maxArgs: 0, //-- command maximum arguments
  usage: "<@usuario>", //-- command usage
  description: "Abraza a un usuario.", //-- command description
};
