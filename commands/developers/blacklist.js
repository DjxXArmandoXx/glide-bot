//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { principalDev } = require("../../configs/config.json");
const schema = require("../../models/blacklist-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args, prefix) {
    if(isNaN(args[0])) return message.channel.send("Debes poner una id valida");
    let reason = args.slice(1).join(" ");
    if(!reason) reason = 'sin especificar';

    try {
        const results = await schema.findOne({userid: args[0]});
        if(results) return message.reply("Este usuario ya esta en la blacklist, si quieres removerlo escribe: `"+prefix+"unblacklist`");
        const newBlacklisted = new schema({
            userid: args[0],
            reason
        });
        newBlacklisted.save();
        message.reply("Usuario añadido a la blacklist\nrazón: `"+reason+"`");
    } catch(err){
        message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
        client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
    }
};

module.exports.help = {
name: "blacklist", //-- command name
aliases: ["bl"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
devOnly: true, //-- command dev only
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<id-usuario> <razón (opcional)>", //-- command usage
description: "blacklistea a un usuario", //-- command description

}