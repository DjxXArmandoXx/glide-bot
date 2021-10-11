//-- modules
const Discord = require('discord.js');
const { messageEmbed } = require('discord.js');

//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    if(!message.guild.me.permissions.has(["SEND_MESSAGES", "ATTACH_FILES"])) return message.channel.send('no tengo permisos suficientes, necesito `ATTACH_FILES`');
    const mention = message.mentions.members.first() || message.member; //--define mention
    let comment = args.join(' '); //--define comment
    let msgErr = 'debes poner el comentario que quieres simular. tambien si quieres puedes simular el comentario de otra persona ej:\n`yt-coment <@usuario> <comentario>`'; //--define msgErr
    if(message.mentions.members.first()) {
        comment = args.slice(1).join(' ');
    }
    let url = `${comment.replace(/ /g, "%20")}`; //--define url
    if(message.mentions.members.first() && !args[1]) return message.channel.send(msgErr); //--we omit errors
    const username = mention.user.username; //--define username
    const result = `https://some-random-api.ml/canvas/youtube-comment?avatar=${mention.user.displayAvatarURL({format: "png"})}&comment=${url}&username=${username.replace(/ /g, "%20")}`; //--define result
    message.channel.send(result).catch((err) => {
        return;
    }); //--send result
}

module.exports.help = {
    name: "yt-coment", //-- command name
    aliases: ["yt-comentario", "comentario-yt", "coment-yt", "youtube-comentario", "comentario-youtube", "yt-comment"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 30, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<@usuario(opcional)> <comentario>", //-- command usage
    description: "simula un comentario de youtube", //-- command description
}