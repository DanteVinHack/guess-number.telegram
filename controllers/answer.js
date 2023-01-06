const botListCommand = require("../options/botListCommand");
const User = require("../models/User");
const { generateRandomNumber, commandExist, messages } = require("../utils");

const answerToMessage = bot => async msg => {
	try {
		const chatId = msg.chat.id;
		const text = msg.text.trim();

		if (commandExist(botListCommand, text)) return;

		await bot.sendMessage(chatId, "Хотите начать играть? /game");
	} catch (e) {
		console.log(e);
	}
};

const asnwerToCallbackQuery =
	(users, bot) =>
	async ({ data, message }) => {
		const chatId = message.chat.id;
		let candidate = users.find(user => user.id === chatId);

		if (!candidate) {
			candidate = new User(chatId);
			users.push(candidate);
		}

		const randomNumber = generateRandomNumber(9);

		if (randomNumber === Number(data)) {
			await bot.sendMessage(chatId, messages.win);
			candidate.incrementRight();
		} else {
			await bot.sendMessage(chatId, messages.lose(randomNumber));
			candidate.incrementWrong();
		}

		users = users.map(user => {
			if (user.id !== candidate.id) {
				return user;
			}

			return candidate;
		});
	};

module.exports = {
	answerToMessage,
	asnwerToCallbackQuery
};
