const Discord = require('discord.js');
const client = new Discord.Client();

const {token, prefix} = require('./config.json');

const Commands = {};

Commands.ping = msg => msg.reply('pong!');

Commands.error = function (msg, cmd){
  msg.reply(`Invalid command: ${cmd}`);
  return;
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on( 'message', msg => {
  const args = msg.content.trim().split(/ +/);

  if(args[0][0] != prefix || msg.author.bot){
    return;
  }

  args[0] = args[0].slice(1);

  if(Commands[args[0]])
    Commands[args[0]](msg);
  else
    Commands.error(msg, args[0]);

} );

client.login(token);