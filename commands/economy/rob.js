//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const add = require('../../helpers/add-money.js');
const remove = require('../../helpers/remove-money.js');
const schema = require('../../models/economy-model.js');


//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const mention = message.mentions.members.first();
    if(!mention) return message.reply("Debes mencionar un usuario valido!");
    if(mention.user.bot) return message.reply("No puedes robar a un bot!");
    const results = await schema.findOne({guildid: message.guild.id, userid: mention.user.id});
    if(!results || results.money < 1) return message.reply('Este usuario no tiene dinero en la cartera');
    const randomMoney = Math.floor(Math.random() * results.money);
    add(message.guild.id, message.author.id, randomMoney);
    remove(message.guild.id, mention.user.id, randomMoney);
    const embedSuccess = new MessageEmbed()
        .setDescription(`**${message.author.username}** ha robado \`${randomMoney}$\` ha **${mention.user.username}**`)
        .setColor('RANDOM')
        .setFooter(`${mention.user.username} asegurate de siempre guardarlo en el banco...`)
        .setTimestamp();
    message.reply({embeds: [embedSuccess]});

};

module.exports.help = {
name: "rob", //-- command name
aliases: ["robar"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false
, //-- command dm only
cooldown: 300, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario>", //-- command usage
description: "Roba dinero a un usuario", //-- command description

}