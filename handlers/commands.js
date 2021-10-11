//-- modules
const { readdirSync, writeFileSync } = require('fs'); //-- define readdirSync (npm i fs)
const ascii = require("ascii-table"); //-- define ascii (npm i ascii-table)
const print = require('../helpers/print.js'); //-- import file helper
const translate = require("@k3rn31p4nic/google-translate-api");

//-- variables
let table = new ascii("Commands"); //-- define table
let usage;
let description;
let permissions;
let args;

module.exports = (client) => {
    const arrayCmds = new Array(); //-- define arrayCmds
    const commandFolders = readdirSync('./commands/'); //-- define commandFolders
    for(const folder of commandFolders) { //-- loop through folders within the commands folder
        const commandFiles = readdirSync(`./commands/${folder}/`).filter(file => file.endsWith('.js')); //-- result folders
        for(const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`); //-- result files in folders
            client.commands.set(command.help.name, command); //-- save name files
            table.addRow(command.help.name, command.help.description).sort(); //-- add name and description to table
            if(command.help.devOnly) continue;
            if(!command.help.inactive) {
                usage = command.help.usage;
                description = command.help.description;
                permissions = command.help.permissions;
                args = command.help.args;
                if(!command.help.usage) usage = "Solo poner el comando."; //-- if no usage
                if(!command.help.description) description = 'Sin descripción.'; //-- if no description
                if(!command.help.permissions) permissions = ['No require permisos.']; //-- if no permissions
                if(command.help.args) args = 'requeridos';
                    else args = 'No requridos';
                    arrayCmds.push({
                    name: command.help.name,
                    description,
                    permissions,
                    category: folder,
                    args,
                    usage
                });
        }
    }
}
writeFileSync('./configs/cmds.json', JSON.stringify(arrayCmds)); //-- save arrayCmds to file

table.setTitle("Commands ("+client.commands.size+")"); //-- set title

console.log(table.toString()); //-- print table
print.info('Cargando comandos...');
}