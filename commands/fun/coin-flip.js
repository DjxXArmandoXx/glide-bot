//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    fetch('https://no-api-key.com/api/v2/coin-flip')
    .then(res => res.json())
    .then(async json => {
        let coin = 'sello';
        if(json.coin === 'heads') coin = 'cara';
        const embedSuccess = new MessageEmbed()
        .setDescription(`**${message.author.username}** ha lanzado una moneda y ha salido **${coin}**`)
        .setImage(json.gif)
        .setColor('RANDOM')
        .setFooter('Te deseo suerte!')
        .setTimestamp();
        message.reply({embeds: [embedSuccess]});
    });
};

module.exports.help = {
name: "coin-flip", //-- command name
aliases: ['tirar-moneda'], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 10, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Lanza una moneda para saber si sale cara o o sello", //-- command description

}