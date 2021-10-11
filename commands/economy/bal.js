//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/economy-model.js");
const schemaBank = require("../../models/bank-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const mention = message.mentions.members.first() || message.member;
  let resultsWallet = await schema.findOne({guildid: message.guild.id, userid: mention.user.id});
  let resultsBank = await schemaBank.findOne({guildid: message.guild.id, userid: mention.user.id});

  //-- conditions
  if(!resultsBank) resultsBank = {};
  if(!resultsWallet) resultsWallet = {};
  if(!resultsBank.money) resultsBank.money = "0";
  if(!resultsWallet.money) resultsWallet.money = "0";
  const embedSuccess = new MessageEmbed()
  .setTitle("Balance de "+mention.user.username)
  .setThumbnail(mention.user.displayAvatarURL({format: "png", dynamic: true}))
  .addField("Cartera", `\`${resultsWallet.money.toString()}$\``, false)
  .addField("Banco", `\`${resultsBank.money.toString()}$\``, false)
  .addField("Total", `\`${parseInt(resultsBank.money) + parseInt(resultsWallet.money)}$\``, false)
  .setColor("RANDOM")
  .setTimestamp()
  .setFooter("balance");
  message.reply({embeds: [embedSuccess]});
};

module.exports.help = {
name: "bal", //-- command name
aliases: ["balance"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 5, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario (opcional)>", //-- command usage
description: "revisa tu balance en la economia", //-- command description

}