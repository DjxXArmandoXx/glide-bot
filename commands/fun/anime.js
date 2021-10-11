//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const translate = require("@k3rn31p4nic/google-translate-api");
const fetch = require('node-fetch');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const name = args.join("%20");
  require('node-fetch')('https://kitsu.io/api/edge/anime?filter[text]='+name)
  .then(res => res.json())
    .then(async json => {
        if(!json.data || json.data.length == 0) return message.reply("Ese anime no existe!");
        translate(json.data[0].attributes.synopsis, {to: 'ES'}).then(res => {
            translate(json.data[0].attributes.status, {to: 'ES'}).then(res1 => {
        const embedSuccess = new MessageEmbed()
        .setTitle(json.data[0].attributes.canonicalTitle)
        .setDescription(res.text.replace("[Escrito por MAL Rewrite]", "ㅤ"))
        .addFields(
            {
                name: "Mostrado en",
                value: json.data[0].attributes.showType.toString(),
                inline: true
            },
            {
                name: "Estado",
                value: res1.text,
                inline: true
            },
            {
                name: "Año de estreno",
                value: require('moment')(json.data[0].attributes.startDate).format('YYYY').toString(),
                inline: true
            },
            {
                name: "Episodios",
                value: json.data[0].attributes.episodeCount.toString(),
                inline: true
            },
            {
                name: "Duración",
                value: json.data[0].attributes.episodeLength.toString() + " minutos por episodio.",
                inline: true	
            },
            {
                name: "Kanji",
                value: json.data[0].attributes.titles.ja_jp,
                inline: true
            },
            {
                name: "Generos",
                value: "en proceso"
            }
        )
        .setThumbnail(json.data[0].attributes.posterImage.tiny)
        .setFooter('Información dada por kitsu api')
        .setTimestamp();
        message.reply({embeds: [embedSuccess]});
    });
  });
})
};

module.exports.help = {
name: "find-anime", //-- command name
aliases: ["anime"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 10, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<nombre>", //-- command usage
description: "Busca y ve las estadisticas de un anime con su nombre", //-- command description

}