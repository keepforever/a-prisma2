const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId, clearLog } = require("../../utils");

async function singleUser(parent, { userId }, ctx) {
  console.log("hello singleUser 💀", "\n");

  const fragment = `
    fragment UserInfo on User {
      id
      name
      email
      decks {
        id
        deckName
        deckDetails
        deckList
        score
        author {
          id
        }
      }
    }
    `;
  const user = await ctx.prisma.user({ id: userId }).$fragment(fragment);

  // console.log("user = ", user, "\n");

  return user;
}

module.exports = {
  singleUser
};
