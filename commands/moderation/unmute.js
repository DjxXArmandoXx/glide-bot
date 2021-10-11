//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require("../../models/mute-model.js");

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args, prefix) {
    const mention = message.mentions.members.first();
    const role = await schema.findOne({serverid: message.guild.id});
    if(!role) return message.reply("Este server no tiene un rol para mutear/unmutear! escribe: `"+prefix+"rolemute` para empezar!");
    if(!mention) return message.reply("Debes mencionar un usuario!");
    if(!role.users.includes(mention.user.id)) return message.reply("Este usuario no esta muteado!");

    await mention.roles.remove(role.rolemute);
    const index = role.users.indexOf(mention.user.id);
    role.users.splice(index, 1);
    await schema.findOneAndUpdate({
        serverid: message.guild.id,
        rolemute: role.rolemute
    },
    {
        users: role.users
    });
    message.reply(`**${mention.user.tag}** ha sido desmuteado!`);
};

module.exports.help = {
name: "unmute", //-- command name
aliases: ["desmute", "desmutear"], //-- command aliases
guildOnly: true, //-- command guild only
dmOnly: false, //-- command dm only
permissions: ["MANAGE_GUILD", "MANAGE_ROLES"], //-- command permissions
cooldown: 5, //-- command cooldown in seconds
args: true, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
usage: "<@usuario>", //-- command usage
description: "Desmutea a un usuario", //-- command description

}