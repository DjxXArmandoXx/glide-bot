//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/shop-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args, prefix) {
    const results = await schema.findOne({guildid: message.guild.id});

    if(results && results.store.length > 0){
        const embedSuccess = new MessageEmbed()
        .setTitle("tienda")
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setDescription(
            `Para ver la información detallada de un producto escribe: \`${prefix}item-info <numero-del-item>\``+results.store.map((p, i) => `\n\n\`#${i+1}\`** ${p.price}$ - ${!p.product.toUpperCase().startsWith("<@") ? p.product.toUpperCase() : "ROL "+p.product.toUpperCase()}**\n${p.description}`
        ).toString().replace(/,/g, " "))
        .setColor("RANDOM")
        .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        return message.reply({ embeds: [embedSuccess]});
    } else {
        const embedFail = new MessageEmbed()
        .setTitle("tienda")
        .setDescription("no hay productos en la tienda")
        .setColor("RANDOM")
        .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        return message.reply({ embeds: [embedFail]});
    }
};

module.exports.help = {
name: "tienda", //-- command name
aliases: ["shop", "store"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Ver la tienda de este servidor", //-- command description

}