//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");

//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    let estados = { //estados del usuario
        online: '🟢:- Online',
        idle: '🟡:- inactivo',
        dnd: '🔴:- no molestar',
        offline: '⚫:- Offline'
    };

    const member = message.mentions.members.first() || message.member; //definimos member
    const autor = message.member; //definimos autor
        function formatDate (template, date) { //creamos una funcion
      var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':'); //ponemos las especificaciones del tiempo
      date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4); //creamos una nueva fecha actual
      return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) { //returnamos la fecha
        return template.split(specs[i]).join(item);
      }, template);
    }
    //-- obtener avatar
    // fetch(`discord.com/api/users/${member.user.id}/`, {
    //     Headers: {
    //         Authorization: "Bot "+client.token
    //     }
    // }).then((res) => {
    //     const { banner, accent_color } = res.data;
    //     console.log(res.data);
    // })
    const embed = new Discord.MessageEmbed() //creamos un nuevo embed
        .setColor("FF0000") //color del embed
        .setDescription(`**Información de ${member}:**`) //descripcion del embed
        .addField("**Nombre**:", "**" + `${member.user.tag}` + "**") //agregamos un campo con el nombre
        .addField("**ID**:", `${member.user.id}` ) //otro campo con la id
        .addField("**Apodo del usuario**:", `${member.nickname !== null ? `${member.nickname}` : 'Ninguno'}`, true) //otro campo con el apodo
        .addField("**Fecha de unión al servidor:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.joinedAt)) //otro con la fecha de union al server
        .addField("**Cuenta Creada:**", formatDate('DD/MM/YYYY, a las HH:mm:ss', member.user.createdAt)) //otro con la fecha que creo la cuenta
        .addField("**Roles:**", member.roles.cache.map(roles => `\`${roles.name}\``).join(', ')) //otro con los roles
        .addField("**Boost?**:", member.premiumSince ? '**Usuario si booster**' : '**Usuario no booster**') //otro para saber si el usuario es booster
        .setThumbnail (member.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })) //que alado salga el avatar del user
        .setFooter(`Pedido por ${autor.user.tag}`, `${message.author.displayAvatarURL()}`) //que en el footer diga quien puso el comando
     message.channel.send({embeds: [embed]}); //mandamos el embed
}

module.exports.help = {
    name: "userinfo", //-- command name
    aliases: ["user"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 60, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<@usuario>", //-- command usage
    description: "Muestra información de un usuario", //-- command description
}