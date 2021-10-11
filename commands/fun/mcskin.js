//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    if(args[0].length > 16) return message.reply("El maximo son 16 caracteres!");

    const skin = `https://minecraftskinstealer.com/api/v1/skin/render/fullbody/${args[0]}/700`;

    const attachSkin = new Discord.MessageAttachment(skin, 'skin.png');

    const embedSuccess = new MessageEmbed()
        .setDescription("Skin de: `"+args[0]+"`")
        .setImage("attachment://skin.png")
        .setColor("#00ff00")
        .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

    message.reply({ embeds: [embedSuccess], files: [attachSkin] });
};

module.exports.help = {
name: "mcskin", //-- command name
aliases: ["view-mcskin"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 5, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<nombre-skin>", //-- command usage
description: "Ver la skin de un usuario", //-- command description

}