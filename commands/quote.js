const fs = require("fs");
const Discord = require("discord.js");

exports.run = (client, message, args) => {
	message.delete().catch(O_o=>{}); 
    let command = args.shift();
    if (!command) {
        command = 'random';
    }

    if (!message.isAdmin && command != 'random') {
		return false;
    }
    
	const fileName = 'data/quotes.json';
    let parsedList = [];
    if (fs.existsSync(fileName)) {
        currentList = fs.readFileSync(fileName, 'utf8');
        parsedList = JSON.parse(currentList);
    }

    if (command == 'add') {
        let quote = args.join(' ');
        parsedList.push(quote);
        fs.writeFileSync(fileName, JSON.stringify(parsedList)); 
        message.channel.send('Quote added.');
    }

    if (command == 'random') {
        let randomNumber = Math.floor(Math.random() * parsedList.length);
        message.channel.send(parsedList[randomNumber]);
    }

    if (command == 'list') {
        let messageArray = [];
        let part = 0;
        messageArray[part] = '..\n**Saved Quotes**\n';
        for (key in parsedList) {
            let quote = parsedList[key];
            messageArray[part] += (parseInt(key) + 1) + ': ' + quote + '\n';
            if ((parseInt(key) + 1) % 10 == 0) {
                (function(part) {
                    setTimeout(function() {
                        message.channel.send(messageArray[part]);
                    }, part * 750);
                })(part);
                part ++;
                messageArray[part] = '..\n';
            }
        }
        if (messageArray[part].length > 0) {
            (function(part) {
                setTimeout(function() {
                    message.channel.send(messageArray[part]);
                }, (part) * 750);
            })(part);
        }
    }

    if (command == 'remove') {
        let removeNumber = args.shift();
        if (removeNumber && parsedList[(parseInt(removeNumber) - 1)]) {
            parsedList.splice((parseInt(removeNumber) - 1), 1);
            fs.writeFileSync(fileName, JSON.stringify(parsedList)); 
            message.channel.send('Quote was removed.');
        } else {
            message.channel.send('Quote "' + removeNumber + '" could not be found.');
        }
    }
};