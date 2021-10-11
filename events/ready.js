//-- modules
const mongoose = require("mongoose"); //-- import mongoose (npm i mongoose)
let { mongoPath } = require("../configs/config.json"); //-- import file
const { defaultPrefix } = require('../configs/config.json'); //-- import default prefix
const print = require('../helpers/print.js'); //-- import file helper

//-- variables

//-- event
module.exports = async (client) =>{
  const array = [ //-- create new array
        { //-- create new object
          name: `${defaultPrefix}prefix`, //-- name status
          type: `WATCHING` //-- type status
        },
        { //-- create new object
          name: `${client.guilds.cache.size} servidores | ${defaultPrefix}prefix`, //-- name status
          type: `WATCHING` //-- type status
        },
      ];
      
          setInterval(() => { //-- infinity loop
              function presence() { //-- create new function
                  client.user.setPresence({
                    activities: [array[Math.floor(Math.random() * array.length)]],
                    status: 'online'
                  });
              }
      
              
              presence(); //-- ejecute function
          }, 2900); //-- time interval
       
    print.info('bot ready: '+client.user.username); //-- print bot ready + bot name
    await mongoose.connect(mongoPath, { //-- connect to mongo
      useNewUrlParser: true, //-- use new url parser
      useUnifiedTopology: true, //-- use unified topology
    }).then(() => {
      console.log("<==========Me conecte a mongo exitosamente!==========>");
    });

}