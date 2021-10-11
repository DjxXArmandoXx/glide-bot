//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { principalDev } = require("../../configs/config.json");
const schema = require("../../models/economy-model.js");
const schemaInv = require("../../models/inventory-model.js");
const schemaShop = require("../../models/shop-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args, prefix) {
    try {
      const results = await schema.findOne({guildid: message.guild.id, userid: message.author.id});
      const resultsInv = await schemaInv.findOne({guildid: message.guild.id, userid: message.author.id});
      const resultsShop = await schemaShop.findOne({guildid: message.guild.id});
      const item = parseInt(args[0]) - 1;
      if(results.money < resultsShop.store[item].price) return message.reply("No tienes dinero suficiente");
      if(resultsInv && resultsInv.inventory.map(i => i.id).includes(resultsShop.store[item].id)){
        // const asd = resultsInv.inventory.filter(i => i.id == resultsShop.store[item].id);
        // const amount = asd[0].amount;
        // const newAmount = amount + 1;
        // schemaInv.findOne({guildid: message.guild.id, userid: message.author.id}, (err, resultsI) => {
        //   if(err) throw err;
        // //  const F = resultsI.inventory.filter(i => i.id == results.store[item].id);
        //  function cambiarValor(valorABuscar, valorViejo, valorNuevo) {
        //   resultsI.inventory.forEach(function (elemento) { // recorremos el array
          
        //      //asignamos el valor del elemento dependiendo del valor a buscar, validamos que el valor sea el mismo y se reemplaza con el nuevo. 
        //     elemento[valorABuscar] = elemento[valorABuscar] == valorViejo ? valorNuevo : elemento[valorABuscar]
        //   });
        //  };
        //  cambiarValor("amount", amount, newAmount);
        //  resultsI.save();
        //  console.log(resultsI.inventory);
        // })
        // return message.reply("Item agregado correctamente");
        return message.reply("Ya tienes ese item");
      } else {
        const addItem = {
          product: resultsShop.store[item].product,
          id: resultsShop.store[item].id,
          description: resultsShop.store[item].description,
          amount: 1,
        };
        if(resultsInv){
          await schemaInv.updateOne({
            guildid: message.guild.id,
            userid: message.author.id
          },
          {
            $push: {
              inventory: addItem
            }
         })
        } else {
          const newItem = new schemaInv({
            guildid: message.guild.id,
            userid: message.author.id,
            inventory: addItem
          });
          newItem.save();
        }
        await results.updateOne({guildid: message.guild.id, userid: message.author.id, money: results.money - resultsShop.store[item].price});
        message.reply("Item agregado! para ver tu inventario escribe: `"+prefix+"inv`");
      }
    } catch(err) {
        message.reply("Hubo un error inesperado, espera a que lo solucionemos! (ya fue enviado a mi creador)");
        client.users.cache.get(principalDev).send('Hubo un error: ```js'+err+'```');
        console.log(err);
    }
};

module.exports.help = {
name: "buy", //-- command name
aliases: ["comprar"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
inactive: true, //-- command inactive
cooldown: 0, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<numero-producto>", //-- command usage
description: "Compra un producto y para usarlo", //-- command description

}