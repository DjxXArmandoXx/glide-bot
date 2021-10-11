//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    let mention = message.mentions.members.first() || message.member; //--define mention
    const embed = new MessageEmbed() //--define embed and create new embed
  .setDescription(`**__aqui esta el avatar de ${mention.user.username} con escala de grises__**`) //--set description to embed
  .setImage(`https://some-random-api.ml/canvas/invertgreyscale?avatar=${mention.user.displayAvatarURL({format: "png"})}`) //--set image to embed
  .setFooter('pedido por: '+message.author.tag) //--set footer to embed
  .setColor('ff0000'); //-set color to embed

message.channel.send({embeds: [embed]}); //--send embed
}

module.exports.help = {
    name: "escala-grises", //-- command name
    aliases: ["eg", "convertir-blanco-y-negro","bn","blanco-y-negro", "blanco-negro"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 120, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<@usuario (opcional)>", //-- command usage
    description: "Convierte tu avatar a escala de grises", //-- command description
}