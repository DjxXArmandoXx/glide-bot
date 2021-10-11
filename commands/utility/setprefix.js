//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { principalDev } = require("../../configs/config.json");
const schema = require("../../models/prefix-model.js");

//-- variables

//-- others

module.exports.run = async function (client, message, args) {
  //-- code
  let prefix = args.join(" ").toLowerCase();  //-- define prefix
  if (prefix.length > 5) return message.reply("El prefix no Debe pasar los 5 caracteres!"); //-- set max characters

await schema.findOneAndUpdate({ //-- find data and update
    serverid: message.guild.id,
    }, //-- find serverid
    { //-- update serverid with serverid and prefix
    serverid: message.guild.id,
    prefix,
    },
    {
    upsert: true, //-- upsert
}).catch(err => {
  message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
  client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
});

message.reply("Prefijo Actualizado! `"+prefix+"`"); //-- send results

};
module.exports.help = {
  name: "setprefix", //-- command name
  aliases: ["set-prefix", "prefix-set"], //-- command aliases
  guildOnly: true, //-- command guild only
  dmOnly: false, //-- command dm only
  permissions: ["ADMINISTRATOR"], //-- command permissions
  cooldown: 5, //-- command cooldown in seconds
  args: true, //-- command arguments
  minArgs: 0, //-- command minimum arguments
  maxArgs: 0, //-- command maximum arguments
  usage: "<prefix>", //-- command usage
  description: "Cambia el prefijo del servidor", //-- command description
};
