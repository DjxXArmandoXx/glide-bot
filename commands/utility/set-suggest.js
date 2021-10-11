//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const schema = require('../../models/suggestions-model.js');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
  const channel = message.mentions.channels.first();
  const results = await schema.findOne({guildid: message.guild.id});
  if(!channel) return message.reply('Debes MENCIONAR un canal valido');
  if(results) {
    const accept = new Discord.MessageButton()
    .setLabel("continuar")
    .setCustomId("accept")
    .setStyle("SUCCESS");
    const cancel = new Discord.MessageButton()
    .setLabel("cancelar")
    .setCustomId("cancel")
    .setStyle("DANGER");
    let row = new Discord.MessageActionRow()
    .addComponents(accept, cancel);

    let sendmsg = await message.reply({content: 'Estas seguro de cambiar el canal de sugerencias?',components: [row]});
    const filter = b => b.user.id === message.author.id;
    const collector = sendmsg.channel.createMessageComponentCollector(filter, {time: 60000});
    collector.on('collect', async(b) => {
        if(b.user.id !== message.author.id) return b.reply({content: "Solo el que puso el comando puede modificar el rol de mute de este servidor!", ephemeral: true});
        if(b.message.id !== sendmsg.id) return;
        if(b.customId === "accept") {
            b.deferUpdate();
            await schema.updateOne({
                guildid: message.guild.id
            }, {
                guildid: message.guild.id,
                channelid: channel.id
            });
            b.message.delete();
            message.reply("Canal reestablecido correctamente.");
        };

        if(b.customId === "cancel") {
            b.deferUpdate();
            b.message.delete();
            return;
        };
    });
    return;
  };

  const newSuggestionChannel = new schema({
    guildid: message.guild.id,
    channelid: channel.id
  });

  await newSuggestionChannel.save().catch(err => console.log(err));
  return message.reply("canal establecido correctamente.");
};

module.exports.help = {
    name: "set-suggest", //-- command name
    aliases: ["set-canal-sugerencias", "setsuggest"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    permissions: ["ADMINISTRATOR"], //-- command permissions
    cooldown: 0, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<#canal>", //-- command usage
    description: "Establece el canal de sugerencias", //-- command description

}