module.exports = async (client, message) => {
  const isCommand = message.content.startsWith(process.env.PREFIX)
  
  if(message.author.bot || !isCommand) return

  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/g)

  const command = args.shift().toLowerCase()

  const cmd = client.commands.get(command)

  if(!cmd) return

  console.log(
		'[#LOG]',
		`${message.author.username} (${message.author.id}) executou o comando: ${cmd.command.name}`
	)

  cmd.run(client, message, args)
}