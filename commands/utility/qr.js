//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

//-- variables
let text;

//-- others

//--command
module.exports.run = async function(client, message, args) {
    text = args[0]; //-- define args[0]
    const img = `http://qr-code-generator.iwwwit.com/image.php?${text}&err=L&back=255-255-255&fore=0-0-0&qrsize=300`; //-- define img
    const attach = new Discord.MessageAttachment(img, "qr.jpg"); //-- create new Attachment
    const embedSuccess = new MessageEmbed() //-- create embed
    .setImage('attachment://qr.jpg')
    .setColor("RANDOM")
    .setFooter("QR generado con exito!", message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp();

    message.reply({embeds: [embedSuccess], files: [attach]}); //-- send embed and attachment
};

module.exports.help = {
name: "qr", //-- command name
aliases: ["generar-qr", "qrcode"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 20, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<link/texto>", //-- command usage
description: "Crea un codigo QR facilmente", //-- command description

}