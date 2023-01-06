const { gameMessage, gameKeyboard } = require('../options/gameOptions')

const startGame = bot => async msg => {
  try {
    const chatId = msg.chat.id

    await bot.sendMessage(chatId, gameMessage, gameKeyboard)

  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { startGame }