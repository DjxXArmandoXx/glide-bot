//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    let c = message.channel;
    let channel = message.member.voice.channel;
    if(!channel) return c.send("debes estar en un canal de voz..");

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return c.send('no puedo iniciar youtube')
        c.send({embeds: [new MessageEmbed().setDescription(`**presiona el link para entrar a youtube:** \n> **__https://discord.com/invite/${invite.code}__**`).setColor('RANDOM')]});
    });

  
  
}

module.exports.help = {
    name: "youtube", //-- command name
    aliases: ["yt", "yt-together", "youtube-together"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 20, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "Inicia una sesion de youtube", //-- command description
}