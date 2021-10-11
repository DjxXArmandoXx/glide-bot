//-- modules
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const translate = require("@k3rn31p4nic/google-translate-api");

//-- variables
let text;
let lang;

//-- others

module.exports.run = async function (client, message, args) {
  //-- code
  fetch("https://no-api-key.com/api/v1/facts")
    .then((res) => res.json())
    .then((json) => {
      text = json.fact;
      lang = "ES";

      translate(text, {
        to: lang,
      }).then((res1) => {
        text = res1.text;
        message.channel.send(text);
      });
    });
};

module.exports.help = {
  name: "fact-random", //-- command name
  aliases: ["random-fact", "fact", "hecho", "random-hecho", "hecho-random"], //-- command aliases
  guildOnly: false, //-- command guild only
  dmOnly: false, //-- command dm only
  cooldown: 0, //-- command cooldown in seconds
  args: false, //-- command arguments
  minArgs: 0, //-- command minimum arguments
  maxArgs: 0, //-- command maximum arguments
  description: "Devuelve un hecho aleatorio", //-- command description
};
