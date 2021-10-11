//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/warn-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const mention = message.mentions.members.first();
  if(!mention) return message.reply("Debes mencionar un usuario!");
  schema.findOne({ guildId: message.guild.id, userId: mention.user.id}, (err, results) => {
    if(err) throw err;
    if(results) {
        if(isNaN(args[1])) return message.reply("Debes ingresar un número!");
        let number = parseInt(args[1]) - 1;
        if(results.warnings.length < number) return message.reply("Ese usuario no tiene ese warning!");
        results.warnings.splice(number, 1);
        results.save();
        message.reply("Advertencia removida con exito!");
    } else {
        message.reply("Este usuario no tiene advertencias en este servidor!");
    }
  });
};

module.exports.help = {
name: "remove-warn", //-- command name
aliases: ["delete-warn", "removewarn", "deletewarn", "rmv-warn", "warn-rmv", "quitar-advertencia"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
permissions: ["MANAGE_GUILD", "KICK_MEMBERS"], //-- command permissions
cooldown: 5, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario> <numero-del-warning>", //-- command usage
description: "Elimina una advertencia de un usuario.", //-- command description

}