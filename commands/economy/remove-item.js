//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/shop-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    schema.findOne({guildid: message.guild.id}, (err, results) => {
        if(err) throw err;
        if(results){
            if(isNaN(args[0])) return message.reply("Debes ingresar un número!");
            let number = parseInt(args[0]) - 1;
            if(results.store.length < number) return message.reply("Ese producto no existe");
            results.store.splice(number, 1);
            results.save();
            message.reply("producto removido con exito!");
        } else {
            message.reply("No hay ningún producto en el tienda!");
        }
    });
};

module.exports.help = {
name: "remove-item", //-- command name
aliases: ["delete-item", "rmv-item"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
permissions: ["MANAGE_GUILD"], //-- command permissions
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<numero-producto>", //-- command usage
description: "Elimina un producto de la tienda", //-- command description

}