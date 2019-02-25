module.exports = (client, message) => {
	console.log('VersusBot has started on ' + client.guilds.size + ' servers.'); 
	client.user.setActivity('Versus');
};