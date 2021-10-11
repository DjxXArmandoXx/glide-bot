//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

//-- variables
let c;
let channel;

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    channel = message.member.voice.channel;
    c = message.channel;
        if(!channel) return c.send("debes estar en un canal de voz..")
            
      fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: "755827207812677713",
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    "Authorization": `Bot ${client.token}`,
                    "Content-Type": "application/json"
                }
            }).then(res => res.json())
            .then(invite =>{
                if(!invite.code) return message.reply("no puedo iniciar el juego")
                message.channel.send(`presiona el link para entrar al juego: https://discord.com/invite/${invite.code}`)
            })
}

module.exports.help = {
    name: "pocker", //-- command name
    aliases: ["cartas"], //-- command aliases
    guildOnly: true, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: 0, //-- command cooldown in seconds
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "inicia un juego de pocker", //-- command description
}