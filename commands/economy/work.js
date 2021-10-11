//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const add = require("../../helpers/add-money.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const randomMoney = Math.floor(Math.random() * 151);

  add(message.guild.id, message.author.id, randomMoney);

    const works = ["Carpintero", "Mecánico", "Lavandero", "Lechero", "Frutero", "Artesano", "Pescador", "Escultor"];
    const randomWork = works[Math.floor(Math.random() * works.length)];
    const embedSuccess = new MessageEmbed()
    .setDescription(`**${message.author.username}** ha trabajado de **${randomWork}** y ha ganado \`${randomMoney}$\``)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter("Suerte!");
    message.reply({embeds: [embedSuccess]});
};

module.exports.help = {
name: "work", //-- command name
aliases: ["trabajar", "trabajo"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 1080, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "trabaja para ganar dinero y comprar productos", //-- command description

}