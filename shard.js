const Discord = require("discord.js");
const { token } = require("./configs/config.json");
const manager = new Discord.ShardingManager('./index.js', {
    token,
    totalShards: 'auto',
});

manager.on('shardCreate', shard => {
    setTimeout(()=> {
    console.log('shard '+shard.id+' creado')
    }, 5000);
});
manager.spawn(manager.totalShards, 10000);