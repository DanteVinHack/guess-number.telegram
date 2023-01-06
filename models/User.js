class User {
  constructor(chatId) {
    this.id = chatId
    this.right = 0
    this.wrong = 0
  }

  incrementRight() {
    this.right++
  }

  incrementWrong() {
    this.wrong++
  }

  info() {
    return {
      right: this.right,
      wrong: this.wrong
    }
  }

}

module.exports = User