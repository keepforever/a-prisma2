const {
  didAlreadyVoteQuery,
  createVoteMutation,
  updateDeckMutation
} = require("./graphql");

async function didTheyVoteAlready(ctx, userId, deckId) {
  const didAlreadyVoteVars = {
    deckId,
    userId
  };

  const { votes } = await ctx.prisma.$graphql(
    didAlreadyVoteQuery,
    didAlreadyVoteVars
  );

  const alreadyVoted = votes.length > 0;

  return alreadyVoted;
};

async function createVote(ctx, deckId, userId, quality) {

  const createVoteVars = {
    deckId,
    userId,
    quality
  };

  const { createVote } = await ctx.prisma.$graphql(
    createVoteMutation,
    createVoteVars
  );
  console.log('createVote = ', createVote, '\n' )

  return !!createVote;
};

async function updateDeck(ctx, deckId, quality) {

  // grab deck to be upvoted
  const deck = await ctx.prisma.deck({ id: deckId });

  let newScore;

  if (quality) {
    newScore = deck.score + 1;
  } else {
    newScore = deck.score - 1;
  }

  const updateDeckVars = {
    id: deckId,
    score: newScore
  };

  const { updateDeck } = await ctx.prisma.$graphql(updateDeckMutation, updateDeckVars);

  console.log('updateDeck = ', updateDeck, '\n' )

  return !!updateDeck;
};




module.exports = {
  didTheyVoteAlready,
  createVote,
  updateDeck
};
