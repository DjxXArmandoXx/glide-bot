//-- modules
const Discord = require('discord.js');
const { readdirSync } = require('fs');
const { defaultPrefix } = require('../../configs/config.json');
const ascii = require('ascii-table');
let table = new ascii();

//-- variables
let devOnly; //-- define devOnly
let guildOnly; //-- define guildOnly

//-- others

module.exports.run = async function(client, message, args, prefix) {
    if(args[0]){
        const commandName = args[0];
        const cmd = client.commands.get(commandName) || client.commands.find((cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName));
        devOnly = 'No';
        guildOnly = 'No';
        if(!cmd && commandName !== defaultPrefix+'prefix') return message.reply("Ese comando no existe!");
        if(cmd.help.usage === "" || !cmd.help.usage) cmd.help.usage = "(Solo poner el comando)";
        if(cmd.help.aliases.length == 0) cmd.help.aliases = "Sin alias";
        if(!cmd.help.description || cmd.help.description === "") cmd.help.description = "Sin descripción";
        if(cmd.help.devOnly) devOnly = 'Si';
        if(cmd.help.guildOnly) guildOnly = 'Si';
        if(commandName === defaultPrefix+"prefix") return message.reply("Ese comando es de prueba, no tiene información importante");
        const embedLoaded = new Discord.MessageEmbed()
        .setTitle("Información del comando "+commandName)
        .addField("Nombre del comando", `\`${cmd.help.name}\``)
        .addField("Alias del comando", `\`${cmd.help.aliases}\``)
        .addField("Solo servidores", `\`${guildOnly}\``) 
        .addField("Solo developers", `\`${devOnly}\``)
        .addField("Descripción del comando", `\`${cmd.help.description}\``)
        .addField("Uso del comando", `\`${prefix}${cmd.help.name} ${cmd.help.usage}\``)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(`${prefix}help`);

        message.reply({embeds: [embedLoaded]});
        return;
    }
    const cmdsEconomy = new Array();
    const cmdsFun = new Array();
    const cmdsMinigames = new Array();
    const cmdsModeration = new Array();
    const cmdsUtility = new Array();

    const res = await require('node-fetch')('http://localhost:3000/api/cmds');
    const json = await res.json();
    let cmdsEconomyData = json.filter(cmd => cmd.category === 'economy');
    let cmdsFunData = json.filter(cmd => cmd.category === 'fun');
    let cmdsMinigamesData = json.filter(cmd => cmd.category === 'minigames');
    let cmdsModerationData = json.filter(cmd => cmd.category === 'moderation');
    let cmdsUtilityData = json.filter(cmd => cmd.category === 'utility');

    cmdsEconomyData.forEach(cmd => cmdsEconomy.push(cmd.name));
    cmdsFunData.forEach(cmd => cmdsFun.push(cmd.name));
    cmdsMinigamesData.forEach(cmd => cmdsMinigames.push(cmd.name));
    cmdsModerationData.forEach(cmd => cmdsModeration.push(cmd.name));
    cmdsUtilityData.forEach(cmd => cmdsUtility.push(cmd.name));


///--------------------------- embeds ---------------------------//
const embedPrincipal = new Discord.MessageEmbed()
    .setTitle("Comandos de "+client.user.username)
    .setDescription(`Hola **${message.author.username}**, ¡Tengo un total de \`${client.commands.size}\` comandos, para ver la información de uno en especifico escribe: \`${prefix}help [comando]\`\n\nSi quieres ver todos en general debes selecionar alguna categoría!`)
    .setThumbnail(message.author.displayAvatarURL({format: "png", size: 1024, dynamic: true}))
    .setTimestamp()
    .setFooter("¡Disfruta mis comandos!")
    .setColor("RANDOM");
    
const embedEconomy = new Discord.MessageEmbed()
    .setTitle("Comandos de Economía 💵")
    .setDescription("**para ver la información de uno en especifico escribe: `h!help [comando]`**\n\n```"+cmdsEconomy.join("   ")+"```")
    .setColor("RANDOM");
    
const embedFun = new Discord.MessageEmbed()
    .setTitle("Comandos de diversión 🎉")
    .setDescription("**para ver la información de uno en especifico escribe: `h!help [comando]`**\n\n```"+cmdsFun.join("    ")+"```")
    .setColor("RANDOM");
    
const embedMinigames = new Discord.MessageEmbed()
    .setTitle("Comandos de minijuegos 🎮")
    .setDescription("**para ver la información de uno en especifico escribe: `h!help [comando]`**\n\n```"+cmdsMinigames.join("   ")+"```")
    .setColor("RANDOM");
    
const embedModeration = new Discord.MessageEmbed()
    .setTitle("Comandos de moderación 📝")
    .setDescription("**para ver la información de uno en especifico escribe: `h!help [comando]`**\n\n```"+cmdsModeration.join("   ")+"```")
    .setColor("RANDOM");
    
const embedUtility = new Discord.MessageEmbed()
    .setTitle("Comandos de utilidad 📝")
    .setDescription("**para ver la información de uno en especifico escribe: `h!help [comando]`**\n\n```"+cmdsUtility.join("   ")+"```")
    .setColor("RANDOM");

//--------------------------- menus ---------------------------//
const menu = new Discord.MessageSelectMenu()
.setCustomId("menu")
.setPlaceholder("Seleciona una categoría")
.setMaxValues(1)
.addOptions([
    {
        label: "Economía",
        description: "Comandos de economía",
        emoji: "💵",
        value: "menuEconomy"
    },
    {
        label: "diversión",
        description: "Comandos de diversión",
        emoji: "866445630587273216",
        value: "menuFun"
    },
    {
        label: "minijuegos",
        description: "Comandos de minijuegos",
        emoji: "🎮",
        value: "menuMinigames"
    },
    {
        label: "moderación",
        description: "Comandos de moderación",
        emoji: "🛡️",
        value: "menuModeration"
    },
    {
        label: "utilidad",
        description: "Comandos de utilidad",
        emoji: "🛠️",
        value: "menuUtility"
    },
    {
        label: "menu Principal",
        description: "Volver al menú principal",
        emoji: "❌",
        value: "menuPrincipal"
    }
]);

const row = new Discord.MessageActionRow()
.addComponents(menu);

const msj = await message.channel.send({embeds: [embedPrincipal], components: [row]});
const collector = msj.createMessageComponentCollector({ time: 120000 });
collector.on("collect", async i => {
    if(i.user.id !== message.author.id) return i.reply({content: "No puedes interferir en el comando de ayuda de otra persona!", ephemeral: true});

    if(i.values[0] === "menuEconomy") {
        i.deferUpdate();
        msj.edit({embeds: [embedEconomy]});
    } else if(i.values[0] === "menuFun") {
        i.deferUpdate();
        msj.edit({embeds: [embedFun]});
    } else if(i.values[0] === "menuMinigames") {
        i.deferUpdate();
        msj.edit({embeds: [embedMinigames]});
    } else if(i.values[0] === "menuModeration"){
        i.deferUpdate();
        msj.edit({embeds: [embedModeration]});
    } else if(i.values[0] === "menuUtility") {
        i.deferUpdate();
        msj.edit({embeds: [embedUtility]});
    } else if(i.values[0] === "menuPrincipal") {
        i.deferUpdate();
        msj.edit({embeds: [embedPrincipal]});
    }
});
setTimeout(() => msj.delete(), 120000);
};


module.exports.help = {
    name: "help", //-- command name
    aliases: ["h", "ayuda"], //-- command aliases
    guildOnly: false, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 10, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "Muestra una lista de todos los comandos disponibles", //-- command description
}