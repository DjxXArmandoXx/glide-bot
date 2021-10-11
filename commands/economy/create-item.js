//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { principalDev } = require("../../configs/config.json");
const schema = require("../../models/shop-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    const results = await schema.findOne({ guildid: message.guild.id });
    let product = args.join(" ").split(" | ");
    let productName = product[0];
    let productPrice = product[1];
    let productDescription = product[2];


    //-- conditions
    if(message.mentions.roles.first() && !message.mentions.roles.first().editable) return message.reply("Debes poner un rol inferior al mio!");
    if(isNaN(productPrice) || !productPrice) return message.reply("debes poner un precio valido");
    if(!productDescription) productDescription = 'Sin descripción';

    const uuid = () => {
      const { v4: uuidv4 } = require("uuid");
      let id = uuidv4();
      return id.slice(0, 8);
    };
    try {
    if(results) {
        await schema.updateOne({
            guildid: message.guild.id
        },
        {
            $push: {
                store: [
                    {
                        id: uuid(),
                        product: productName,
                        price: productPrice,
                        description: productDescription,
                    },
                ],
            },
        });
        return message.reply("producto agregado correctamente.");
    } else {
        const newShop = new schema({
            guildid: message.guild.id,
            store: [
                {
                    id: uuid(),
                    product: productName,
                    price: productPrice,
                    description: productDescription,
                },
            ],
        });
        await newShop.save();
        return message.reply("producto agregado correctamente.");
    };
} catch(err){
    message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
    client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
}
};

module.exports.help = {
    name: "add-item", //-- command name
    aliases: ["create-item", "crear-item"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    permissions: ["MANAGE_GUILD"], //-- command permissions
    cooldown: 0, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<nombre-producto o @rol> | <precio> | <descripción (opcional)> (el \" | \" es requerido)", //-- command usage
    description: "Agrega un producto a la tienda", //-- command description

}