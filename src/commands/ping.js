module.exports = {
	run: (client, message) => {
		message.channel.send(
			`\`\`📡\`\` Latência da API: ${Math.round(client.ping)}ms.`
		)
	},

	get command() {
		return {
			name: 'ping',
			description: 'Comando de ping(latência)',
			usage: 'avatar',
		}
	},
}