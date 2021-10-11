//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/economy-model.js");
const schemaBank = require("../../models/bank-model.js");
const bigInt = require('big-integer');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const mention = message.mentions.members.first();
    if(!mention) return message.reply("Debes mencionar a alguien!");
    if(isNaN(args[1]) && args[1] !== "bank") return message.reply("Debes poner un numero valido!");
    if(args[1] !== "bank" && parseInt(args[1]) < 1) return message.reply("Debes poner un numero mayor a 0!");
    if(args[1] === "bank"){
        const resultsBank = await schemaBank.findOne({guildid: message.guild.id, userid: mention.user.id});
        if(resultsBank) {
            const addBank = bigInt(parseInt(resultsBank.money)).plus(parseInt(args[2]));
            return console.log(bigInt(parseInt(args[2])));
            await schemaBank.updateOne({guildid: message.guild.id, userid: mention.user.id}, {money: addBank});
            message.reply(`Has agregado \`${args[2]}$\` a **${mention.user.tag}**`);
        } else {
            const newBank = new schemaBank({
                guildid: message.guild.id,
                userid: mention.user.id,
                money: bigInt(parseInt(args[2]))
            });
            await newBank.save();
            message.reply(`Has agregado \`${args[2]}$\` a **${mention.user.tag}**`);
        }
        return;
    }

    const resultsWallet = await schema.findOne({guildid: message.guild.id, userid: mention.user.id});
    if(resultsWallet) {
        const addWallet = parseInt(resultsWallet.money) + parseInt(args[1]);
        await resultsWallet.updateOne({guildid: message.guild.id, userid: mention.user.id, money: addWallet});
        message.reply(`Has agregado \`${args[1]}$\` a **${mention.user.tag}**`);
    } else {
        const newWallet = new schema({
            guildid: message.guild.id,
            userid: mention.user.id,
            money: parseInt(args[1])
        });
        await newWallet.save();
        message.reply(`Has agregado \`${args[1]}$\` a **${mention.user.tag}**`);
    }
};

module.exports.help = {
name: "add-money", //-- command name
aliases: ["agregar-dinero", "añadir-dinero"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
permissions: ["ADMINISTRATOR"], //-- command permissions
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario> <bank (opcional)> <cantidad>", //-- command usage
description: "agrega dinero a una persona", //-- command description

}