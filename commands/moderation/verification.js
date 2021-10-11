//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/captcha-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const results = await schema.findOne({guildid: message.guild.id});
    const channel = message.mentions.channels.first();
    const role = message.mentions.roles.first();
    if(!channel) return message.reply("Debes mencionar un canal `captcha <#canal> <on | off> <@rol-verificado>`");
    if(!args[1]) return message.reply("Debes elegir si lo activas o desactivas (on | off) `captcha <#canal> <on | off> <@rol-verificado>`")
    if(results && args[1] === 'on') return message.reply("La verificación captcha ya esta activado.");
    if(!results && args[1] === 'off') return message.reply("La verificación captcha ya esta desactivado.");
    if(!role) return message.reply("Debes mencionar un ROL! `captcha <#canal> <on | off> <@rol-verificado>`");
    if(!role.editable) return message.reply("Debes mencionar un rol inferior al mio");
    if(args[1] === 'on') {
        const activate = new schema({
            guildid: message.guild.id,
            channel: channel.id,
            roleid: role.id
        });
        await activate.save().catch(err => {
            console.log(err);
        });
        return message.reply("La verificación captcha ha sido activada.");
    };
    if(args[1] === 'off') {
        await schema.deleteOne({guildid: message.guild.id});
        return message.reply("La verificación captcha ha sido desactivada.");
    };
};

module.exports.help = {
name: "captcha", //-- command name
aliases: ["verificación", "verification"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
inactive: true, //-- command inactive
permissions: ["ADMINISTRATOR"], //-- command permissions
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<#canal> <on | off> <@rol-verificado>", //-- command usage
description: "activa la verificación captcha en el servidor", //-- command description

}