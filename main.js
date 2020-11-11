const Discord = require('discord.js');
const client = new Discord.Client();

const {token, prefix} = require('./config.json');

const Commands = {};

Commands.error = function (cmd, msg){
  msg.reply(`Invalid command: ${cmd}`);
  return;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const args = msg.content.trim().split(/ +/);
  if(args[0] != prefix || msg.author.bot){
    return;
  }
  if(Commands[args[1]])
    Commands[args[1]](msg);
  else
    Commands.error(args[1], msg);
});

client.login(token);
