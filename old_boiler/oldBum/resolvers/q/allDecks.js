const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, clearLog } = require('../../utils')

function createToken(userId) {
  return jwt.sign({ userId, expiresIn: "7d" }, process.env.APP_SECRET)
}

async function allDecks(parent, args, ctx) {

  const fragment = `
    fragment DeckInfo on Deck {
      id
      deckName
      deckDetails
      deckList
      score
      author {
        id
        name
        email
      }
    }
    `;
  // find user by email lookup and return data as specified in
  // the fragment defined above.
  const allDecks = await ctx.prisma.decks().$fragment(fragment);

  // console.log('allDecks = ', allDecks, '\n' )

  return allDecks
};

module.exports = {
  allDecks,
}


// console.log(
//   'ctx.request.headers = ',
//   Object.keys(ctx.request.headers), '\n'
// );
