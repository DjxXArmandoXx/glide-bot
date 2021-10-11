//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require('../../models/warn-model.js');
const schemalogs = require("../../models/localLogs-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const mention = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const guildId = message.guild.id;
    const userId = mention.user.id;

        try {
        let resultslogs = await schemalogs.findOne({namelog: "mute", mention: mention.user.id, guildId});
        if(!resultslogs) resultslogs = {};
        if(!resultslogs.log) resultslogs.log = "0";
        const results = await schema.findOne({
            guildId,
            userId
        });
        if(!results) return message.reply("Ese usuario no tiene sanciones!");
        if(!results.warnings[0]) return message.reply("Ese usuario no tiene advertencias!");
            message.reply({embeds: [new MessageEmbed()
                .setTitle(`Advertencias de ${mention.user.username}`)
                .setDescription(
                    results.warnings.map((w, i) => 
                    `\n**#${i+1}**\n${w.reason}`
                ).toString())
            .setColor("RANDOM")
            .setFooter(`advertido: ${results.warnings.length} | sileciado: ${resultslogs.log} | kickeado: 0`)
        ]});
        } catch(err) {
            console.log(err);
        }
};

module.exports.help = {
name: "warnings", //-- command name
aliases: ["warns", "advertencias", "history", "punishiments"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 10, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario (opcional)>", //-- command usage
description: "Revisa tus o los warnings de algún usuario" //-- command description

}