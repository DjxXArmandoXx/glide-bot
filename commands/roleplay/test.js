//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { registerFont, createCanvas, loadImage } = require('canvas');

//-- variables

//-- others
const canvas = createCanvas(626, 320);
const ctx = canvas.getContext('2d');

//--command
module.exports.run = async function(client, message, args) {
    const avatarurl = message.author.displayAvatarURL({ format: 'png', dynamic: true });
    const background = await loadImage('https://p4.wallpaperbetter.com/wallpaper/585/526/393/minimalism-empty-gradient-simple-background-wallpaper-preview.jpg');
    const avatar = await loadImage(avatarurl);
    ctx.drawImage(background, 0, 0, 626, 320);
    ctx.font = '25px Arial';
    ctx.fillText("Nombre: Jaun Perez Saez Martinez", 210, 50);
    ctx.fillText("Edad: 100", 210, 100);
    ctx.fillText("año Nacimiento: 1921", 210, 150);
    ctx.fillText("id: 795360779237851167", 210, 200);
    ctx.fillText("Estado: soltero", 210, 250);
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(avatar, 5, 10, 200, 150);
    ctx.stroke();
    ctx.closePath();
    message.channel.send({files: [new Discord.MessageAttachment(canvas.toBuffer())]});
};

module.exports.help = {
name: "jas", //-- command name
aliases: [], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
inactive: true, //-- command inactive
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments

}