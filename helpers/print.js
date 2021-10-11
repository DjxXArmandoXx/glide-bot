//-- modules
const chalk = require('chalk'); //-- import chalk (npm i chalk)
const moment = require('moment'); //-- import moment (npm i moment)

function info(text){
    return console.log('['+chalk.green('INFO')+'] ' + chalk.gray(moment(Date.now()).format('D/MM/YYYY HH:mm:ss'))+' '+text);
};

module.exports = {
    info
};