const { me } = require("./me");
const { allDecks } = require("./allDecks");
const { singleDeck } = require("./singleDeck");
const { singleUser } = require("./singleUser");
const { decksConnection } = require("./decksConnection");


const q = {
  async me(parent, args, ctx) {
    return await me(parent, args, ctx);
  },
  async allDecks(parent, args, ctx) {
    return await allDecks(parent, args, ctx);
  },
  async singleDeck(parent, args, ctx) {
    return await singleDeck(parent, args, ctx);
  },
  async singleUser(parent, args, ctx) {
    return await singleUser(parent, args, ctx);
  },
  async decksConnection(parent, args, ctx) {
    return await decksConnection(parent, args, ctx);
  },

};

module.exports = { q };
