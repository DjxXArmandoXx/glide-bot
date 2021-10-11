//-- modules
const Discord = require('discord.js'); //-- import Discord.js (npm i discord.js)
const { token } = require("./configs/config.json"); //-- import file

//-- variables
const intents = new Discord.Intents(32767); //-- create new intents
const client = new Discord.Client({ intents }); //-- create new client
client.commands = new Discord.Collection(); //-- create new Discord Collection
client.cooldowns = new Discord.Collection(); //-- create new Discord Collection
client.snipes = new Map(); //-- create new Map

//-- handlers
require('./handlers/commands.js')(client); //-- import commands handler
require('./handlers/events.js')(client); //-- import events handler
require('./web/index.js'); //-- import web
//-- token
client.login(token); //-- start bot

module.exports = {
    guilds: client.guilds.cache.size,
};
//--------------------------CREDTIS------------------------------//
//-- CODED BY: xnayx
//-- CONTACT: xnayx#7713 OR xnayx#0001
//-- STATISTICS: lines of code: 5,170 date: Saturday, october 9, 2021