//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const add = require("../../helpers/add-money.js");
const remove = require("../../helpers/remove-money.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const danger = ["win", "lose"];
    const crimes = ["asesinato", "robo", "atraco"];
    const random = danger[Math.floor(Math.random() * danger.length)];
    const randomCrime = crimes[Math.floor(Math.random() * crimes.length)];
    const randomMoney = Math.floor(Math.random() * 151);
    if(random == "win") {
        add(message.guild.id, message.author.id, randomMoney);

        const embedWin = new MessageEmbed()
            .setDescription(`**${message.author.username}** ha cometido el crimen: **${randomCrime}** y ganó \`${randomMoney}$\``)
            .setColor("RANDOM")
            .setFooter("La proxima puede salir mal!", message.author.displayAvatarURL({ dynamic: true}))
            .setTimestamp();
        return message.reply({embeds: [embedWin]});
    } else {
        if(random == "lose") {
            remove(message.guild.id, message.author.id, randomMoney);

            const embedLose = new MessageEmbed()
                .setDescription(`**${message.author.username}** ha cometido el crimen: **${randomCrime}** lo atrapo la policia y perdió \`${randomMoney}$\``)
                .setColor("RANDOM")
                .setFooter("La proxima puede salir bien!", message.author.displayAvatarURL({ dynamic: true}))
                .setTimestamp();
            return message.reply({embeds: [embedLose]});
        }
    }
};

module.exports.help = {
name: "crime", //-- command name
aliases: ["crimen"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 3600, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Comete un crimen y arriesgate a perder dinero", //-- command description

}