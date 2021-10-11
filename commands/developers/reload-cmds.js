//-- modules
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

//-- variables

//-- others

//--command
module.exports.run = async function(client, message, args) {
    for(const folder of readdirSync('./commands/')) { //-- loop through folders within the commands folder
        const commandFiles = readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js')); //-- result folders
        for(const file of commandFiles) {
            delete require.cache[require.resolve(`../${folder}/${file}`)];
            const command = require(`../${folder}/${file}`);
            client.commands.delete(command.help.name);
            client.commands.set(command.help.name, command);
            console.log('comando recargado: '+command.help.name);
    }
}
};

module.exports.help = {
name: "reload-cmds", //-- command name
aliases: ["rcmds"], //-- command aliases
guildOnly: false, //-- command guild only
dmOnly: false, //-- command dm only
devOnly: true, //-- command dev only
cooldown: 0, //-- command cooldown in seconds
args: false, //-- command arguments
minArgs: 0, //-- command minimum arguments
maxArgs: 0, //-- command maximum arguments
description: "Recarga los comandos del bot", //-- command description

}