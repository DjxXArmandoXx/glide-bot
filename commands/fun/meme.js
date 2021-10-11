//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Meme } = require("spanish.memes");
//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const embedSuccess = new MessageEmbed()
    .setTitle("meme")
    .setImage(Meme())
    .setColor("RANDOM")
    .setFooter("meme")
    .setTimestamp();
    message.reply({embeds: [embedSuccess]});
};

module.exports.help = {
name: "meme", //-- command name
aliases: [], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 5, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Ver un meme en español", //-- command description

}