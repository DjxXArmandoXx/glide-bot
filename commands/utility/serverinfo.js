//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

//-- variables
let embed;

//-- others

module.exports.run = async function(client, message, args) {
    embed = new Discord.MessageEmbed() //creamos un embed
  .setTitle("**Información del servidor:**") //titulo del embed
  .setThumbnail(message.guild.iconURL()) //que alado salga el icono del server
  .setAuthor(message.guild.name, message.guild.iconURL()) //que ponga quien puso el msg
  .addField('**ID**', message.guild.id, true) //agregamos un campo con la id del server
  .addField('**Día de creación**',message.guild.joinedAt.toString()) //otro con el dia de creacion del server
  //.addField("**Región:**", message.guild.region) //otro con la region del server
  .addField("**Dueño:**",`<@${message.guild.ownerId}>`) //otro con el dueño del server
  .addField(`**Canales:** [${message.guild.channels.cache.size}]ㅤㅤ`, `Categoria: ${message.guild.channels.cache.filter(x => x.type === "GUILD_CATEGORY").size} texto: ${message.guild.channels.cache.filter(x => x.type === "GUILD_TEXT").size} voz: ${message.guild.channels.cache.filter(x => x.type === "GUILD_VOICE").size}`, true) //otro con los canales del server
  .addField('**Miembros:**', message.guild.memberCount.toString(), true) //otro cn la cantidad de miebros en el server
  .addField("**Bots:**",`${message.guild.members.cache.filter(m => m.user.bot).size}`) //otro con la cantidad de bots que hay en el server
  .addField('**Emojis:**',message.guild.emojis.cache.size.toString()) //otro con la cantidad de emojis en el server
  .addField('**Boosts:**',message.guild.premiumSubscriptionCount.toString()) //otro con la cantidad de boost en el server
  .addField('**Nivel de verificación:**',`${message.guild.verificationLevel}`) //otro el nivel de verificación del server
  .addField('**Roles:**', message.guild.roles.cache.size.toString(),true) //otro con la cantidad de roles en el server
  .setColor("FF0000"); //color del embed
  message.channel.send({embeds: [embed]}); //mandamos  el embed
}/*
const Discord_Employee = 1;
const Partnered_Server_Owner = 2;
const HypeSquad_Events = 4;
const Bug_Hunter_Level_1 = 8;
const House_Bravery = 64;
const House_Brilliance = 128;
const House_Balance = 256;
const Early_Supporter = 512;
const verfied_bot = 65536
const Bug_Hunter_Level_2 = 16384;
const Early_Verified_Bot_Developer = 131072;

let user_flags = [];
if(message.author.flags.bitfield === Discord_Employee) {
    user_flags.push('empleado de discord');
};

if(message.author.flags.bitfield === Partnered_Server_Owner) {
    user_flags.push('dueño de server partner');
};

if(message.author.flags.bitfield === HypeSquad_Events) {
    user_flags.push('eventos de hypesquad');
};

if(message.author.flags.bitfield === House_Bravery) {
    user_flags.push("House_Bravery");
};
if(message.author.flags.bitfield === )
*/
module.exports.help = {
    name: "serverinfo", //-- command name
    aliases: ["server"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 60, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "Muestra información del servidor", //-- command description
}