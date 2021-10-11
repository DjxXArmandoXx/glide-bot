//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/blacklist-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    let arr = [];
    let newArr = [];
    await arr.push(await schema.find({}))
    for(let i = 0; i < arr[0].length; i++) {
        newArr.push(arr[0][i].userid); 
    }
    const embedSuccess = new MessageEmbed()
    .setDescription(`**Usuarios blacklisteados: **\`\`\`\n${newArr.join("\n")}\`\`\``)
    .setColor("RANDOM")
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
    .setTimestamp();

    message.reply({embeds: [embedSuccess]});
};

module.exports.help = {
name: "list-blacklisted", //-- command name
aliases: ["list-blacklist", "l-bl"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
devOnly: true, //-- command dev only
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Ver todos los usuario que están en la blacklist", //-- command description

}