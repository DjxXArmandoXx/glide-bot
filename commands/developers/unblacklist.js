//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/blacklist-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const results = await schema.findOne({userid: args[0]});
    if(!results) return message.reply("Ese usuario no esta en la blacklist");
    await schema.deleteOne({userid: args[0]});
    message.reply("Ese usuario ha sido eliminado correctamente");
};

module.exports.help = {
name: "unblacklist", //-- command name
aliases: ["remove-blacklist", "rblacklist"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
devOnly: true, //-- command dev only
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<id-usuario>", //-- command usage
description: "Elimina de la blacklist a un usuario", //-- command description

}