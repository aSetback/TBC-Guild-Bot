const fs = require("fs");
const Discord = require("discord.js");


exports.run = (client, message, args) => {

	message.delete().catch(O_o=>{}); 

	const user = args[0] ? args[0] : '';
	const role = args[1] ? args[1] : '';
	if (!user || !role) {
		message.channel.send('Please use the command correctly: +setrole Name Role');
		return false;
	}

	const playerName = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
	const roleName = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

	
	const fileName = 'data/roles.json';
	
	let parsedList = {};
	if (fs.existsSync(fileName)) {
		currentList = fs.readFileSync(fileName, 'utf8');
		parsedList = JSON.parse(currentList);
	}
	
	parsedList[playerName] = roleName;
	fs.writeFileSync(fileName, JSON.stringify(parsedList)); 

	message.channel.send('Updated ' +  playerName + ' as ' + roleName + '.');

};