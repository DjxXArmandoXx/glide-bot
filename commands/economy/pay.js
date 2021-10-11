//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require('../../models/economy-model.js');
const add = require('../../helpers/add-money.js');
const remove = require('../../helpers/remove-money.js');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const mention = message.mentions.members.first();
  const amount = args[1];
  
  if(amount < 1) return message.reply('Debes espcicificar una cantidad mayor a 1.');
  const dbUser = await schema.findOne({ guildid: message.guild.id, userid: message.author.id });
  
  if(!dbUser || !dbUser.money || dbUser.money < amount) return message.reply('No tienes dinero ese dinero.');
  add(message.guild.id, mention.user.id, amount); 
  remove(message.guild.id, message.author.id, amount);
  message.reply(`Has pagado \`${amount}\` a **${mention.user.username}**`);
};

module.exports.help = {
    name: "pay", //-- command name
    aliases: ["pagar"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 10, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 2, //-- command minimum arguments
    maxArgs: 2, //-- command maximum arguments
    usage: "<@usuario> <cantidad>", //-- command usage
    description: "Pagale cierta cantidad de dinero a un usuario", //-- command description

}