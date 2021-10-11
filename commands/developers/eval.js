//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { inspect } = require("util");

//-- variables

//-- others

module.exports.run = async function(client, message, args) {
    //-- code
    let c = message.channel;
  

    const command = args.join(" ");

    try {
        function r(text) {
            return [
                text,
                text,
                text,
                text,
                text,
                text,
                text,
                text,
                text,
                text,
                text,
                text,
            ];
        };
        const evaled = eval(command);
        let palabras = ["destroy", "for(let i =0;i<=500;i++)"];
        if(palabras.some(word => message.content.toLowerCase().includes(word))) return;
        const embed = new Discord.MessageEmbed()
        .setTitle("eval")
        .addField(`**tipo**:`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
        .addField("**evaluado en:**", `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\`\``, true)
        .addField(`**entrada:**`, `\`\`\`js\n${command}\`\`\``)
        .addField("**salida:**", `\`\`\`js\n${inspect(evaled, {depth: 0 })}\`\`\``)
        .setColor("FF0000");
        c.send({embeds: [embed]});
    } catch (error) {
        const embedfallo = new Discord.MessageEmbed()
        .setColor("FF0000")
        .addField(`entrada`, `\`\`\`js\n${command}\`\`\``)
        .addField("error", `\`\`\`js\n${error}\`\`\``);
        c.send({embeds: [embedfallo]});
    }
}

module.exports.help = {
    name: "eval", //-- command name
    aliases: [], //-- command aliases
    guildOnly: false, //-- command guild only
    dmOnly: false, //-- command dm only
    devOnly: true, //-- command dev only
    cooldown: 0, //-- command cooldown in seconds
    args: true, //-- command arguments
    minArgs: 0, //-- command minimum arguments
    maxArgs: 0, //-- command maximum arguments
    usage: "<codejs>", //-- command usage
    description: "evalua codigo en javaScript", //-- command description

}