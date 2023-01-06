module.exports.commandExist = (commands, commandText) =>
	commands.some(({ command }) => command === commandText);

module.exports.generateRandomNumber = limit => Math.ceil(Math.random() * limit);

module.exports.messages = {
	win: `
Вы угадали число
  
Сыграть еще раз? /game
  `,
	lose: randomNumber => `
К сожаления вы не угадали число и проиграли 😔.
А это было число ${randomNumber}

Сыграть еще раз? /game
  `
};
