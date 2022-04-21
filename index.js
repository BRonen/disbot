const fs = require('fs')
const path = require("path")
const Enmap = require('enmap')
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.commands = new Enmap()

const init = () => {
	const commandsPath = path.join(__dirname, 'src/commands/')
	const cmdFiles = fs.readdirSync(commandsPath)
	console.log('[#LOG]', `Carregando o total de ${cmdFiles.length} comandos.`)

	cmdFiles.forEach(f => {
		if (f.split('.').slice(-1)[0] !== 'js') return
		console.log(
			`	Carregando o comando "${f}".`
		)
		try {
			const props = require(`${commandsPath}/${f}`)
			if (props.init) {
				props.init(client)
			}
			client.commands.set(props.command.name, props)
		} catch (e) {
			console.log(`[#ERROR] Impossivel executar comando ${f}: ${e}`)
		}
	})
	
	const eventsPath = path.join(__dirname, 'src/events/')
	const evtFiles = fs.readdirSync(eventsPath)
	console.log('[#LOG]', `Carregando o total de ${evtFiles.length} eventos.`)

	evtFiles.forEach(f => {
		const eventName = f.split('.')[0]
		console.log(
			`	Carregando o comando "${eventName}".`
		)
		const event = require(`${eventsPath}/${f}`);

		client.on(eventName, event.bind(null, client));
	})
	
	client.on('error', err => console.error('[#ERROR]', err))

	client.login(process.env.TOKEN)
}

init()
