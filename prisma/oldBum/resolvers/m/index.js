const { userSignup } = require("./userSignup");
const { login } = require("./login");
const { refreshToken } = require("./refreshToken");
const { userSettings } = require("./userSettings");
const { sendMessage } = require("./sendMessage");
const { addCard } = require("./addCard");
const { addDeck } = require('./addDeck');
const { upVoteDeck } = require("./upVoteDeck");


const m = {
  async addCard(parent, args, ctx) {
    return await addCard(parent, args, ctx);
  },
  async upVoteDeck(parent, args, ctx) {
    return await upVoteDeck(parent, args, ctx);
  },
  async addDeck(parent, args, ctx) {
    return await addDeck(parent, args, ctx);
  },
  async userSignup(parent, args, ctx) {
    return await userSignup(parent, args, ctx);
  },
  async login(parent, args, ctx) {
    return await login(parent, args, ctx);
  },
  async refreshToken(parent, args, ctx) {
    return await refreshToken(parent, args, ctx);
  },
  async userSettings(parent, args, ctx) {
    return await userSettings(parent, args, ctx);
  },
  async sendMessage(parent, args, ctx) {
    return await sendMessage(parent, args, ctx);
  },
};

module.exports = { m };
