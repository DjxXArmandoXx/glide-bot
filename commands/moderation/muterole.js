//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { principalDev } = require("../../configs/config.json");
const schema = require("../../models/mute-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function (client, message, args) {
  let muterole = message.mentions.roles.first(); //-- define the role to mute
  if(!muterole) return message.reply("La mención debe ser hacía un rol!");
  if(muterole.editable === false) return message.reply("No puedo editar ese rol!, elije otro");
  const db = await schema.findOne({serverid: message.guild.id});
  if(db) {
    let msg = "Estas seguro de cambiar el rol de mute de este servidor? (los users que estaban muteados se tendran que desmutear manualmente)";
    const accept = new Discord.MessageButton()
    .setLabel("continuar")
    .setCustomId("accept")
    .setStyle("SUCCESS");
    const cancel = new Discord.MessageButton()
    .setLabel("cancelar")
    .setCustomId("cancel")
    .setStyle("DANGER");
    let row = new Discord.MessageActionRow()
    .addComponents(accept, cancel);

    let sendmsg = await message.reply({content: msg,components: [row]});
    const filter = b => b.user.id === message.author.id;
    const collector = sendmsg.channel.createMessageComponentCollector(filter, {time: 60000}); 
    collector.on("collect", async (button) => {
      if(button.user.id !== message.author.id) return button.reply({content: "Solo el que puso el comando puede modificar el rol de mute de este servidor!", ephemeral: true});
      if(button.customId == 'accept'){
        button.deferUpdate();
        message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
          await channel.permissionOverwrites.create(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
          });
      });
        try {
        schema.findOneAndUpdate({
            serverid: message.guild.id
          },
          {
            serverid: message.guild.id,
            rolemute: muterole.id,
            users: "854492600903925781"
          },
          {
            upsert: true
          }).then(() => {
              message.reply("Se establecio el rol correctamente!");
          });
      } catch(err) {
          message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
          client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
      }
      button.message.delete();
      } else if(button.customId == 'cancel'){
        button.deferUpdate();
        sendmsg.delete();
      }
    })
    return;
  } //-- end confirm modify muterole

  message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
    await channel.permissionOverwrites.create(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
    })
});
  try {
  schema.findOneAndUpdate({
      serverid: message.guild.id
    },
    {
      serverid: message.guild.id,
      rolemute: muterole.id
    },
    {
      upsert: true
    }).then(() => {
        message.reply("Se establecio el rol correctamente!");
    });
} catch(err) {
    message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
    client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
};

};

module.exports.help = {
  name: "mute-role", //-- command name
  aliases: ["set-mute-role", "role-mute", "rolemute", "muterole"], //-- command aliases
  guildOnly: true, //-- command guild only
  dmOnly: false, //-- command dm only
  permissions: ["MANAGE_ROLES", "MANAGE_GUILD"], //-- command permissions
  cooldown: 3, //-- command cooldown in seconds
  args: true, //-- command arguments
  minArgs: 0, //-- command minimum arguments
  maxArgs: 0, //-- command maximum arguments
  usage: "<@rol> (beta)", //-- command usage
  description: "Establece el rol de mute de este servidor", //-- command description
};
