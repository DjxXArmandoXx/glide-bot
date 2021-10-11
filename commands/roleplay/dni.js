//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const mongoose = require("mongoose");
const schema = require("../../models/register-model.js");
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(626, 320);
const ctx = canvas.getContext('2d');
clear = require('clear-canvas');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args, prefix) {
  try {
  let results = await schema.findOne({serverid: message.guild.id, id: message.author.id});
  console.log(`{\nname: ${results.name},\nage: ${results.age},\nyearBirth: ${results.yearBirth},\nid: ${results.id},\nstatus: ${results.status}\n}`);

  //-- dni
    const avatarurl = message.author.displayAvatarURL({ format: 'png', dynamic: true });
    const background = await loadImage('https://p4.wallpaperbetter.com/wallpaper/585/526/393/minimalism-empty-gradient-simple-background-wallpaper-preview.jpg');
    const avatar = await loadImage(avatarurl);
    ctx.drawImage(background, 0, 0, 626, 320);
    ctx.font = '25px Arial';
    ctx.fillText("Nombre: "+results.name, 210, 50);
    ctx.fillText("Edad: "+results.age, 210, 100);
    ctx.fillText("año Nacimiento: "+results.yearBirth, 210, 150);
    ctx.fillText("id: "+results.id, 210, 200);
    ctx.fillText("Estado: "+message.author.username, 210, 250);
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(avatar, 5, 25, 200, 150);
    ctx.stroke();
    ctx.closePath();
    const dni = new Discord.MessageAttachment(canvas.toBuffer());
    message.reply({files: [dni]});
  } catch (err) {
    console.log(err);
  }
};

module.exports.help = {
name: "dni", //-- command name
aliases: [], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
inactive: true, //-- command inactive
permissions: ["SEND_MESSAGES"], //-- command permissions
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Muestra tu DNI", //-- command description

}