//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const { registerFont, createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(626,320);
const ctx = canvas.getContext('2d');
const schema = require("../../models/register-model.js");
//-- variables

//-- others

//-- command
module.exports.run = async function (client, message, args, prefix) {

  let register = args.join(" ").split(" | ");
  let name = register[0];
  let age = parseInt(register[1]);
  let yearBirth = new Date().getFullYear() - age;
  let id = message.author.id;
  let status = 'soltero';
  let serverid = message.guild.id;
  let servername = message.guild.name;

  //-- conditions
  if (isNaN(age)) return message.reply("Debes ingresar una edad valida!");
  if (age < 18) return message.reply("Debes ser mayor de edad en el rol de tu personaje!");
  if (age > 100) return message.reply("Debes ingresar una edad menor o igual a 100!");
  if(name.length > 24) return message.reply("El nombre de tu personaje no puede superar los 24 caracteres!");

    try {
      const results = await schema.findOne({serverid: message.guild.id, id: message.author.id});
      if(results) return message.reply("En este servidor ya estás registrado!");
    
      await schema.findOneAndUpdate(
        {
          serverid,
          id
        },
        {
          serverid,
          servername,
          tag: message.author.tag,
          id,
          name,
          age,
          yearBirth,
          status,
        },
        {
          upsert: true,
        }
      );
    } catch(err) {
      console.error(err);
    }
    
    const avatarurl = message.author.displayAvatarURL({ format: 'png', dynamic: true });
    const background = await loadImage('https://p4.wallpaperbetter.com/wallpaper/585/526/393/minimalism-empty-gradient-simple-background-wallpaper-preview.jpg');
    const avatar = await loadImage(avatarurl);
    ctx.drawImage(background, 0, 0, 626, 320);
    ctx.font = '25px Arial';
    ctx.fillText("Nombre: "+name, 210, 50);
    ctx.fillText("Edad: "+age, 210, 100);
    ctx.fillText("año Nacimiento: "+yearBirth, 210, 150);
    ctx.fillText("id: "+id, 210, 200);
    ctx.fillText("Estado: "+status, 210, 250);
    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(avatar, 5, 25, 200, 150);
    ctx.stroke();
    ctx.closePath();
    return message.reply({content: `Te has Registrado con Exito! Para ver tu DNI escribe \`${prefix}dni\``, files: [new Discord.MessageAttachment(canvas.toBuffer())]});
};
module.exports.help = {
  name: "register", //-- command name
  aliases: ["registrar", "registrame"], //-- command aliases
  guildOnly: true, //-- command guild only
  dmOnly: false, //-- command dm only
  inactive: true, //-- command inactive
  cooldown: 0, //-- command cooldown in seconds
  args: true, //-- command arguments
  minArgs: 0, //-- command minimum arguments
  maxArgs: 0, //-- command maximum arguments
  usage: '<nombre> | <edad> (el " | " es requerido)', //-- command usage
  description: 'Registra tu personaje', //-- command description
};
