//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/economy-model.js");
const schemaBank = require("../../models/bank-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const resultsWallet = await schema.findOne({guildid: message.guild.id, userid: message.author.id});
    const resultsBank = await schemaBank.findOne({guildid: message.guild.id, userid: message.author.id});
    
    //-- conditions
    if(args[0] !== "all" && isNaN(args[0])) return message.reply("Debes poner un numero!");
    if(!resultsWallet || resultsWallet.money === 0) return message.reply("No tienes dinero para depositar!");
    if(resultsWallet.money < parseInt(args[0])) return message.reply("No tienes ese dinero!");
    if(args[0] == "all") args[0] = resultsWallet.money;
    if(args[0] !== "all" && parseInt(args[0]) < 1) return message.reply("Debes poner un numero mayor a 0!");

    if(resultsBank) {
        const addBank = parseInt(resultsBank.money) + parseInt(args[0]);
        const rmvWallet = parseInt(resultsWallet.money) - parseInt(args[0]);

        await schemaBank.updateOne({guildid: message.guild.id, userid: message.author.id}, {money: addBank});
        await schema.updateOne({guildid: message.guild.id, userid: message.author.id}, {money: rmvWallet});

    } else {
        const rmvEco = parseInt(resultsWallet.money) - parseInt(args[0]);
        await schema.updateOne({guildid: message.guild.id, userid: message.author.id}, {money: rmvEco});

        let newBank = new schemaBank({
            guildid: message.guild.id,
            userid: message.author.id,
            money: args[0]
          });

          await newBank.save();

    }

    const embedSuccess = new MessageEmbed()
    .setDescription(`**${message.author.username}** ha depositado \`${args[0]}$\``)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`${message.author.username}`, `${message.author.avatarURL()}`);
    message.reply({embeds: [embedSuccess]});

};

module.exports.help = {
name: "deposit", //-- command name
aliases: ["depositar", "dep"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<cantidad | all>", //-- command usage
description: "deposita todo o parte de tu dinero", //-- command description

}