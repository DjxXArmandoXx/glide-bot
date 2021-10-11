//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const translate = require("@k3rn31p4nic/google-translate-api");

//-- variables
let lang;
let text;
let text2;

//-- others

module.exports.run = async function (client, message, args) {
  //-- code
  lang = "ES"; //-- set lang
  fetch("https://no-api-key.com/api/v1/riddle") //-- fetch to api
    .then((res) => res.json())
    .then((json) => {
        text = json.question; //-- define question
        text2 = json.answer; //-- define answer
        translate(text, { //-- translate text
            to: lang
        }).then(res1 => {
            message.channel.send(res1.text+"\n\n`si no sabes la respuesta en 20 segundos se te la dara al md`"); //-- send question
        })
        setTimeout(()=>{ //-- add timeout
        translate(text2, { //-- translate text2
            to: lang
        }).then(res2 => {
            message.author.send("respuesta: **"+res2.text+"**") //-- send answer in dm
            .catch(err => { //-- handle errors with catch
                message.channel.send("hubo un error al mandar el mensaje, puede que tengas el md cerrado."); //-- send message if error
            });
            message.channel.send('**respuesta enviada..**') //-- send result successfully
        });
    }, 20000); //-- set time to timeout
    });
};

module.exports.help = {
  name: "adivinanza", //-- command name
  aliases: ["question", "pregunta"], //-- command aliases
  guildOnly: true, //-- command guild only
  dmOnly: false, //-- command dm only
  cooldown: 5, //-- command cooldown in seconds
  args: false, //-- command arguments
  minArgs: 0, //-- command minimum arguments
  maxArgs: 0, //-- command maximum arguments
  description: "El bot te pone una adivinanza (beta)", //-- command description
};
