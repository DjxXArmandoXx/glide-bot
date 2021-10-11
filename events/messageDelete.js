//-- modules
const Discord = require('discord.js');

//-- variables

//-- event
module.exports = async (client, message) => {
    let content = message.content;
    if(message.embeds.length > 0) content = 'Mensaje embed, no puedo mostrarlo por ahora...';
    client.snipes.set(message.channel.id, {
        content: content,
        delete: message.author,
        channel: message.channel,
    });
};
