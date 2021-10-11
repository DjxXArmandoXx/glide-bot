//-- modules
const { readdirSync } = require('fs'); //-- define readdirSync (npm i fs)
const print = require('../helpers/print.js'); //-- import file helper

//-- variables
module.exports = (client) => {
    for (const file of readdirSync("./events/")) {
        if (file.endsWith(".js")) { //-- skip non javascript files
          let fileName = file.substring(0, file.length - 3); //-- files name
          let eventName = file.split(".")[0]; //-- event name
          print.info(`evento cargado: ${eventName}`); //-- print console event name
          let fileContents = require(`../events/${file}`); //-- content of files events
        
          client.on(fileName, fileContents.bind(null, client)); //-- start events
        }
      }
}