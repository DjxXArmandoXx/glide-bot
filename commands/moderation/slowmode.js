//-- modules
const Discord = require('discord.js');
const ms = require('ms');

//-- variables
const prefix = 'g!';

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
let channel = message.channel;

let time = args[0];
if(!time) return message.channel.send(`Debes escribir un tiempo, ej: \`${prefix}slowmode 1m, ${prefix}slowmode 6h etc\``);
if(time === 'off'){
    channel.setRateLimitPerUser(0);

    return message.channel.send("El **SlowMode** para este canal a sido desactivado");
};

let convert = ms(time);
if(convert > 21600000) return message.channel.send('hubo un error inesperado, puede ser que hayas puesto mas de 6h (el maximo).');
let toSecond = Math.floor(convert / 1000);
if(!toSecond || toSecond == undefined) return message.channel.send("Debes poner un tiempo valido");

await channel.setRateLimitPerUser(toSecond).catch(err => {
   return message.channel.send('hubo un error inesperado, puede ser que hayas puesto mas de 6h (el maximo).');
});

message.channel.send(`El **SlowMode** de este canal ha sido cambiado a: \`${time}\``)
}

module.exports.help = {
    name: "slowmode", //-- command name
    aliases: [], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    permissions: ["MANAGE_CHANNELS"], //-- command permissions
    cooldown: 0, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<time | off>", //-- command usage
    description: "Ajusta el slowmode del canal", //-- command description
}
