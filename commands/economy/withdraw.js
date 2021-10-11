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
    if(args[0] == 'all') args[0] = resultsBank.money;
    if(args[0] !== "all" && parseInt(args[0]) < 1) return message.reply("Debes poner un numero mayor a 0!");
    if(resultsBank) {
        if(resultsWallet) {
            let addEco = parseInt(args[0]) + parseInt(resultsWallet.money);
            let rmvBank = parseInt(resultsBank.money) - parseInt(args[0]);
            await schema.updateOne({guildid: message.guild.id, userid: message.author.id}, {money: addEco});
            await schemaBank.updateOne({guildid: message.guild.id, userid: message.author.id}, {money: rmvBank});
            message.reply(`**${message.author.username}** ha retirado \`${args[0]}$\` del banco`);
        }
    } else if(!resultsBank || resultsBank === 0){
        return message.reply("No tienes dinero suficiente");
    }
};

module.exports.help = {
name: "withdraw", //-- command name
aliases: ["retirar", "with"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 5, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<cantidad | all>", //-- command usage
description: "retira todo o parte de tu dinero en el banco", //-- command description

}