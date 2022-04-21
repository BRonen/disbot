module.exports = async client => {
	console.log(`[#LOG] has started as ${client.user.username}.`)
  
	client.user.setPresence({
		status: 'online',
		game: {
			name: 'name',
			type: 'type',
			url: 'https://www.google.com/',
		},
	});
};