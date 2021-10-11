//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/shop-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    schema.findOne({guildid: message.guild.id}, (err, results) => {
        if(err) throw err;
        if(!results) return message.reply("Este servidor no tiene tienda");
        if(!results.store) return message.reply("Este servidor no tiene nada en la tienda");
        if(isNaN(args[0])) return message.reply("Debes ingresar un numero!");
        if(!results.store[parseInt(args[0]) -1]) return message.reply("Este item no existe!");
        let item = results.store[parseInt(args[0]) -1];
        let isrole = 'No';
        if(item.product.startsWith("<@")) isrole = 'Si';
        if(isrole == 'Si') {item.product = '`rol `'+item.product}else{item.product = '`'+item.product+'`'};
        const embedSuccess = new MessageEmbed()
            .setTitle("Información del producto")
            .addField("producto", item.product)
            .addField("Rol", "`"+isrole+"`")
            .addField("Descripción", "`"+item.description+"`")
            .addField("Precio", "`"+item.price+"$`")
            .setColor("RANDOM")
            .setFooter("info-item")
            .setTimestamp();
            message.reply({embeds: [embedSuccess]});
    });
};

module.exports.help = {
name: "item-info", //-- command name
aliases: ["info-item"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
cooldown: 10, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<numero-item>", //-- command usage
description: "Ver la info de un producto", //-- command description

}