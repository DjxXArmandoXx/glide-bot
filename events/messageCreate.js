//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = Discord;
const schema = require("../models/prefix-model.js");
const schemaBlacklist = require("../models/blacklist-model.js");
const { devsId, defaultPrefix } = require("../configs/config.json");

//-- variables

//-- event

module.exports = async (client, message) => {
  //-- prefix
  const resultsBlacklist = await schemaBlacklist.findOne({userid: message.author.id});
  const prefixDb = await schema.findOne({serverid: message.guild.id});
  let prefix;
if (message.author.bot) return;
  if(message.channel.type === "DM") prefix = defaultPrefix;
    else if(prefixDb) prefix = prefixDb.prefix;
      else prefix = defaultPrefix;

  //-- exit prefix
  if (message.content == defaultPrefix+"prefix") {
    //-- create new command
    return message.channel.send(
      `Hola! actualmente mi prefix es **${prefix}**, para mas ayuda pon **${prefix}help**`
      ); //-- send message to canal
    }
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    //-- aliases: ['alias'],
  const cmd = client.commands.get(commandName) || client.commands.find((cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  
  //-- cmd prefix
  if(message.content === defaultPrefix) return;
  if (!cmd && message.content !== defaultPrefix+"prefix") return message.reply("Ese comando no existe!");
  
  //-- blacklist
  if(resultsBlacklist) {
    const embedBlacklist = new MessageEmbed()
    .setDescription("No puedes usar este comando debido a que estás en la blacklist por: `"+resultsBlacklist.reason+"`")
    .setColor("RANDOM")
    .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp();
    
    return message.reply({embeds: [embedBlacklist]});
  };
  try {
    //-- command handler functions: ()
    //-- inactive: true or false,
    if(cmd.help.inactive && !devsId.includes(message.author.id)) return message.reply("Ese comando no existe!");
    
    //-- devOnly: true or false,
    if(cmd.help.devOnly) {
      const devOnly = new MessageEmbed()
      .setDescription(`**Solo los desarrolladores pueden usar este comando!**`)
      .setColor("RANDOM")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}));
      if(!devsId.includes(message.author.id)) return message.reply({embeds: [devOnly]});
    }
    
    //-- dmOnly: true or false,
    if (cmd.help.dmOnly && message.channel.type === "GUILD_TEXT")
      return message.reply(
        "No puedes usar este comando en los canales de texto, debe ser en mensaje directo al bot"
      );

    //-- guildOnly: true or false,
    if (cmd.help.guildOnly && message.channel.type === "DM")
      return message.author.send("¡No puedes usar este comando por DM!");

    //-- args: true of false,
    //-- minArgs: number,
    //-- maxArgs: number,
    if ((cmd.help.args && !args.length) || (cmd.help.minArgs && cmd.help.minArgs < args.length) || (cmd.help.maxArgs && cmd.help.maxArgs > args.length)) {
      let reply = `Te hacen falta argumentos, ${message.author}!`;

      //-- usage: ['<Data requeriment>'],
      if (cmd.help.usage) {
        reply += `\nEl uso correcto es: \`${prefix}${cmd.help.name} ${cmd.help.usage}\``;
      }

      return message.reply(reply);
    }


    //-- cooldown: number(seconds),
    if(!devsId.includes(message.author.id)) {
    const { cooldowns } = client;
    
    if (!cooldowns.has(cmd.help.name)) {
      cooldowns.set(cmd.help.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(cmd.help.name);
    const cooldownAmount = (cmd.help.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        return message.reply(
          `por favor espera ${require('humanize-duration')((expirationTime - now), { language: "es", round: true, largest: 1 })} para volver a usar el comando \`${prefix}${cmd.help.name}\``
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }
    //-- permissions: ['Permission-list'];
    const validPermissions = [
      "CREATE_INSTANT_INVITE",
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "ADMINISTRATOR",
      "MANAGE_CHANNELS",
      "MANAGE_GUILD",
      "ADD_REACTIONS",
      "VIEW_AUDIT_LOG",
      "PRIORITY_SPEAKER",
      "STREAM",
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "MANAGE_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "USE_EXTERNAL_EMOJIS",
      "VIEW_GUILD_INSIGHTS",
      "CONNECT",
      "SPEAK",
      "MUTE_MEMBERS",
      "DEAFEN_MEMBERS",
      "MOVE_MEMBERS",
      "USE_VAD",
      "CHANGE_NICKNAME",
      "MANAGE_NICKNAMES",
      "MANAGE_ROLES",
      "MANAGE_WEBHOOKS",
      "MANAGE_EMOJIS",
    ];

    if (cmd.help.permissions) {
      let invalidPerms = [];
      for (const perm of cmd.help.permissions) {
        if (!validPermissions.includes(perm)) {
          return console.log(`Permiso inválido ${perm}`);
        }
        if (!message.member.permissions.has(perm)) {
          invalidPerms.push(perm);
        }
      }

      if (invalidPerms.length) {
        return message.reply(
          `Te hacen falta permisos: \`${invalidPerms}\``
        );
      }
    }

    cmd.run(client, message, args, prefix);
  } catch (error) {
    message.reply(
      "Hubo un error inesperado, ¡espera a que lo solucionemos!"
    );
    return console.log(error);
  }
};
