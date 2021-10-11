//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { principalDev } = require('../../configs/config.json');
const ms = require("ms");
const schema = require("../../models/mute-model.js");
const schemalog = require("../../models/localLogs-model.js");

//-- variables

//-- others

//-- command
module.exports.run = async function(client, message, args, prefix) {
  const mention = message.mentions.members.first();
  const role = await schema.findOne({serverid: message.guild.id});
  if(mention.user.id === message.author.id) return message.reply("No puedes mutearte a ti mismo!");
  if(!role) return message.reply("Este servidor no tiene un rol para mutear, para establecer uno escribe: `"+prefix+"rolemute`");
  if(role.users.includes(mention.id)) return message.reply("¡Ese usuario ya esta Muteado!");

  try {
    await schema.findOneAndUpdate({
        serverid: message.guild.id
    },
    {
        serverid: message.guild.id,
        rolemute: role.rolemute,
        $push: {
            users: mention.user.id
        }
    },
    {
        upsert: true
    }).then(async()=>{
        mention.roles.add(role.rolemute).catch(err => {
            return message.reply("No se pudo mutear al usuario");
        });
        message.reply(`**${mention.user.tag}** ha sido Muteado!`);
        let numlog = await schemalog.findOne({namelog: "mute", mention: mention.user.id, guildId: message.guild.id});
        if(!numlog) numlog = { log: 0 };
        await schemalog.findOneAndUpdate({
            namelog: "mute",
            mention: mention.user.id,
            guildId: message.guild.id
        },
        {
            namelog: "mute",
            mention: mention.user.id,
            guildId: message.guild.id,
            log: numlog.log + 1
        },
        {
            upsert: true
        }).catch(err => {
            client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
            console.error(err);
    });
    });
  } catch(err) {
    message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
    client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
}
}

module.exports.help = {
    name: "mute", //-- command name
    aliases: ["mutear", "silenciar"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    permissions: ["MANAGE_GUILD", "MANAGE_ROLES"], //-- command permissions
    cooldown: 0, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<@usuario>", //-- command usage
    description: "Mutea a un usuario", //-- command description

}