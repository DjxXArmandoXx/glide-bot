//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/inventory-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args, prefix) {
    const results = await schema.findOne({guildid: message.guild.id, userid: message.author.id});
    if(results && results.inventory.length > 0){
    const embedSuccess = new MessageEmbed()
        .setTitle("Inventario")
        .setDescription(
            "Para usar un producto escribe: `"+prefix+"use <numero-producto>`"+results.inventory.map((i, u) => `\n\n**#${u+1} ~ ${!i.product.toUpperCase().startsWith("<@") ? i.product.toUpperCase() : "ROL "+i.product.toUpperCase()}**\n${i.description}`
            ).toString().replace(/,/g, " "))
        .setColor("RANDOM")
        .setFooter(results.inventory.length+" productos")
        .setTimestamp();
        message.reply({embeds: [embedSuccess]});
    } else {
        return message.reply("Inventario vacio.");
    }
};

module.exports.help = {
name: "inventory", //-- command name
aliases: ["inv", "inventario"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Ver que productos tienes en el inventario", //-- command description

}