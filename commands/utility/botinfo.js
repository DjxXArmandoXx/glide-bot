//-- modules
const Discord = require('discord.js'); // npm i discord.js
const { MessageEmbed } = require('discord.js'); // npm i discord.js
const os = require('os') // npm i os
const moment = require('moment') // npm i moment
const cpuStat = require('cpu-stat') //npm i cpu-stat

//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    const status = { //definimos los estados
        online: '🟢:- Online', //el estado "online" ahora es "online"
        idle: '🟡:- inactivo', //el estado "idle" ahora es "inactivo"
        dnd: '🔴:- no molestar', //el estado "dnd" ahora es "no molestar"
        offline: '⚫:- Offline' //el estado "offline" ahora es "offline"
    }
    const days = Math.floor(client.uptime / 86400000) //definimos los dias
            const hours = Math.floor(client.uptime / 3600000) % 24 // 1 Dia = 24 horas
            const minutes = Math.floor(client.uptime / 60000) % 60 // 1 Hora = 60 minutos
            const seconds = Math.floor(client.uptime / 1000) % 60 // 1 Minuto = 60 segundos

    function formatBytes(bytes, decimals = 2) { //creamos una funcion para darle formato a los bytes
        if (bytes === 0) return '0 Bytes'; //si bytes es igual a 0 volver poniendo 0 bytes
    
        const k = 1024; //definimos k
        const dm = decimals < 0 ? 0 : decimals; //definimos dm
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; //definimos los formatos de espacio
    
        const i = Math.floor(Math.log(bytes) / Math.log(k)); //definimos "i"
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]; //devolvemos un flotante
    }
    cpuStat.usagePercent(function(error, percent) { //creamos una funcion
        if(error) return message.reply(error); //si hay un error mandar un mensaje de el error
        const memoryusage = formatBytes(process.memoryUsage().heapUsed); //uso de memoria 
        const node = process.version; //version de nodejs
        const CPU = percent.toFixed(2); //uso de cpu
        const CPUModel = os.cpus()[0].model; //modelo de la maquina
        const cores = os.cpus().length; //nucleos del procesador

        const embed = new MessageEmbed() //creamos un embed
        .setAuthor(client.user.username, client.user.displayAvatarURL()) //ponemos un autor
        .setTimestamp() //ponemos que diga la fecha que se mando
        .setColor('RANDOM') //color del embed
        .addFields(
            {
                name: "Nombre",
                value: client.user.username,
                inline: true,
            },
            {
                name: "ID",
                value: client.user.id,
                inline: true,
            },
            {
                name: "Estado",
                value: status[client.presence.status],
                inline: false,
            },
            {
                name: "Creado el",
                value: moment(client.user.createdAt).format('DD/MM/YYYY'),
                inline: false,
            },
            {
                name: "Añadido al server",
                value: moment(client.joinedAt).format('DD/MM/YYYY'),
                inline: false,
            },
            {
                name: "Servers",
                value: client.guilds.cache.size.toString(),
                inline: true,
            },
            {
                name: "Versión del bot",
                value: require('../../package.json').version,
                inline: false,
            },
            {
                name: "Tiempo activo",
                value: `${days} Dias ${hours} horas ${minutes} minutos ${seconds} segundos`,
                inline: false,
            },
            {
                name: "Version de node",
                value: node.toString(),
                inline: true,
            },
            {
                name: "Version de discord.js",
                value: Discord.version,
                inline: true,
            },
            {
                name: "Uso de ram",
                value: memoryusage.toString(),
                inline: true,
            },
            {
                name: "Nucleos CPU",
                value: cores.toString(),
                inline: true,
            }
        )
        message.channel.send({embeds: [embed]}); //mandamos el embed
    })
}

module.exports.help = {
    name: "botinfo", //-- command name
    aliases: ["bot"], //-- command aliases
    guildOnly: false, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 60, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "Muestra información del bot", //-- command description




}