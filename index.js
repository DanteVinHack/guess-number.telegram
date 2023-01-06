const TelegramBot = require("node-telegram-bot-api");
const commandList = require("./options/botListCommand");
const {
	answerToMessage,
	asnwerToCallbackQuery
} = require("./controllers/answer");
const { startGame } = require("./controllers/startGame");
const config = require("config");

const bot = new TelegramBot(config.get("token"), { polling: true });

let users = [];

const startBot = async ({
	commands,
	answerToMessage,
	startGame,
	asnwerToCallbackQuery
}) => {
	try {
		answerToMessage = answerToMessage(bot);
		startGame = startGame(bot);
		asnwerToCallbackQuery = asnwerToCallbackQuery(users, bot);

		await bot.setMyCommands(commands);

		await bot.on("message", answerToMessage);

		await bot.onText(/\/game/, startGame);

		await bot.onText(/\/start/, async ({ chat }) => {
			await bot.sendMessage(
				chat.id,
				'В этом телеграмм боте вы можете поиграть в игру - "Угадай число"'
			);
		});

		await bot.on("callback_query", asnwerToCallbackQuery);

		await bot.onText(/\/info/, async ({ chat }) => {
			try {
				const chatId = chat.id;
				const { right, wrong } = users.find(user => user.id === chatId);

				await bot.sendMessage(
					chatId,
					`Правильно: ${right}. Неправильно угадано: ${wrong}`
				);
			} catch (e) {
				console.log(e);
			}
		});
	} catch (e) {
		console.log(e);
	}
};

startBot({
	commands: commandList,
	answerToMessage,
	startGame,
	asnwerToCallbackQuery
});
