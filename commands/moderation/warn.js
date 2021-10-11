//-- modules
const Discord = require('discord.js'); //-- import discord.js (npm i discord.js)
const { MessageEmbed } = require('discord.js'); //-- import MessageEmbed from discord.js
const { principalDev } = require('../../configs/config.json'); //-- import principalDev from config.json
const schema = require("../../models/warn-model.js"); //-- require schema

//--command
module.exports.run = async function(client, message, args) {
    let user = message.mentions.members.first(); //-- define user
    if(user == message.author) return message.channel.send("No te puedes warnear a ti mismo");
    if(!user) return message.channel.send("Debes mencionar un usuario!"); //-- if not user
    
        const guildId = message.guild.id; //-- define guild id
        const userId = user.user.id; //-- define user id
        let reason = args.slice(1).join(" "); //-- define reason for warn
        if(reason.length > 51) return message.reply("Solo puedes poner 51 caracteres!"); //-- if reason is more than 51
        if(!reason) reason = "Sin especificar"; //-- omit errors
    
        const warning = { //-- create object to save it
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason
        };
            try { //-- we foresee exceptions
       await schema.findOneAndUpdate({ //-- find and update to db
           guildId, //-- find guild id
           userId //-- find user id
       }, {
           guildId, //-- update with server id
           userId, //-- update with user id
           $push: { //-- push new object to array
               warnings: warning
           }
       }, {
           upsert: true //-- upsert
       });
            } catch (err) { //-- handle errors
                message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
                client.users.cache.get(principalDev).send("Hubo un error: ```js"+err+"```");
            }
        const embedSuccess = new Discord.MessageEmbed() //-- create new embed
        .setDescription(`El usuario **${user.user.tag}** fue warneado por **${reason}** `) //-- description to embed
        .setColor("FF0000"); //-- color to embed
        const embedUser = new Discord.MessageEmbed()
        .setTitle("Notificación!")
        .setDescription(`Haz sido warneado! info: \n\`\`\`razón: ${reason}\nstaff: ${message.author.tag}\nservidor: ${message.guild.id}\`\`\``)
        .setFooter("Comportate bien!")
        .setColor("RANDOM")
        .setTimestamp();
        message.reply({embeds: [embedSuccess]}); //-- send embed success
        user.send({embeds: [embedUser]}).catch(err=>{}); //-- send the embed to the user and handle errors
};

module.exports.help = {
name: "warn", //-- command name
aliases: ["warnear", "advertir"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
permissions: ["MANAGE_GUILD", "KICK_MEMBERS"], //-- command permissions
cooldown: 5, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario> <razón>", //-- command usage
description: "Warnea a un usuario", //-- command description

}