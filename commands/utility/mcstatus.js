//-- modules
const Discord = require('discord.js');
// const disbut = require('discord-buttons');

//-- variables
let mg;
let button;
let row;
let buttonClose;

//-- others

module.exports.run = async function(client, message, args) {
    //--info
    const img = 'http://status.mclive.eu/healypvp/healypvp.us/25565/banner.png';
    const attach = new Discord.MessageAttachment(img, 'info.png');

    //-- buttons
    button = new Discord.MessageButton()
    .setLabel("actualizar")
    .setCustomId("update")
    .setStyle("SUCCESS");

    buttonClose = new Discord.MessageButton()
    .setLabel("cerrar")
    .setCustomId("close")
    .setStyle("DANGER");

    row = new Discord.MessageActionRow()
    .addComponents(button, buttonClose);

    //-- send message

    message.channel.send({files: [attach]}).then(msg => {
        msg.edit({components: [row]});
        client.on("interactionCreate", async button => {
            
    })
});

};

module.exports.help = {
    name: "mcstatus", //-- command name
    aliases: ["mc-status"], //-- command aliases
    guildOnly: false, //-- command guild only
    dmOnly: false, //-- command dm only
    cooldown: "", //-- command cooldown
    args: false, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    description: "Muestra el estado del servidor de minecraft", //-- command description
}