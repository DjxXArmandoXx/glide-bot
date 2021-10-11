//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schemaInv = require("../../models/inventory-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    schemaInv.findOne({guildid: message.guild.id, userid: message.author.id}, (err, results) => {
        if(err) throw err;
        if(results) {
            if(isNaN(args[0])) return message.reply("Debes ingresar un número!");
            let number = parseInt(args[0]) - 1;
            if(results.inventory.length < number) return message.reply("Ese usuario no tiene ese producto!");
            if(results.inventory[number].product.startsWith("<@")){
                const author = message.member;
                let result = results.inventory[number].product.replace("<@&", "");
                result = result.replace(">", "");
                
                author.roles.add(result);
                message.reply("Rol "+results.inventory[number].product+" agregado correctamente!");
                results.inventory.splice(number, 1);
                return results.save();
            } else {
                message.reply("Producto **"+results.inventory[number].product+"** usado correctamente.")
                results.inventory.splice(number, 1);
                return results.save();
            }
        }
    })
};

module.exports.help = {
name: "use", //-- command name
aliases: ["usar-item", "use-item"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<numero-item>", //-- command usage
description: "Usa un item de tu inventario", //-- command description

}