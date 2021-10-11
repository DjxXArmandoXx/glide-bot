//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/blacklist-model.js");

//-- variables
let results;
let mention;
let confirm;

//-- others

//--command
module.exports.run = async function(client, message, args) {
    mention = client.users.cache.get(args[0]);
    if(mention) mention = client.users.cache.get(args[0]).username;
    if(!mention) mention = 'No se puede obtener';
    results = await schema.findOne({userid: args[0]});
    confirm = 'Si';
    if(!results) confirm = 'No';
    const embedResults = new MessageEmbed()
    .setTitle("Información!")
    .addField("**Nombre del usuario**", "`"+mention+"`")
    .addField("Blacklisteado", "`"+confirm+"`")
    .setColor("RANDOM")
    .setFooter("Blacklist", message.author.displayAvatarURL({ dynamic: true}))
    .setTimestamp();

    if(results){
        embedResults.addField("Razón blacklisteo", `\`${results.reason}\``)
    }
    message.reply({embeds: [embedResults]});
};

module.exports.help = {
name: "check-blacklist", //-- command name
aliases: ["check-bl", "c-bl"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
devOnly: true, //-- command dev only
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<id-usuario>", //-- command usage
description: "Revisa si un usuario esta en la blacklist ademas de ver su info", //-- command description

}