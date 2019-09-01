const {
  didAlreadyVoteQuery,
  createVoteMutation,
  updateDeckMutation,
  updateVoteMutation
} = require("./graphql");

async function didTheyVoteAlready(ctx, userId, deckId, quality) {
  const didAlreadyVoteVars = {
    deckId,
    userId
  };

  const { votes } = await ctx.prisma.$graphql(
    didAlreadyVoteQuery,
    didAlreadyVoteVars
  );

  const alreadyVoted = votes.length > 0;

  let sameVoteAsBefore;

  if(alreadyVoted) {
    sameVoteAsBefore = votes[0].quality === quality;
  }

  return [alreadyVoted, sameVoteAsBefore];
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
    console.log('deck.score = ', deck.score, '\n' )
    newScore = deck.score + 1;
    console.log('newScore = ', newScore, '\n' )
  } else {
    console.log('deck.score = ', deck.score, '\n' )
    newScore = deck.score - 1;
    console.log('newScore = ', newScore, '\n' )
  }

  const updateDeckVars = {
    id: deckId,
    score: newScore
  };

  const { updateDeck } = await ctx.prisma.$graphql(updateDeckMutation, updateDeckVars);

  console.log('updateDeck = ', updateDeck, '\n' )

  return !!updateDeck;
};

async function updateVote(ctx, deckId, userId, quality) {

  // GET VOTE ID //
  const didAlreadyVoteVars = {
    deckId,
    userId
  };
  const { votes } = await ctx.prisma.$graphql(
    didAlreadyVoteQuery,
    didAlreadyVoteVars
  );
  const voteId = votes[0].id;
  // GET VOTE ID //

  // UPDATE VOTE BY ID //
  const updateVoteVars = {
    voteId,
    quality
  }
  const updateVoteSuccess = await ctx.prisma.$graphql(
    updateVoteMutation,
    updateVoteVars
  );
  console.log('updateVoteSuccess = ', updateVoteSuccess, '\n' )
  // UPDATE VOTE BY ID //

  // UPDATE DECK SCORE //
  const updateDeckSuccess = await updateDeck(ctx, deckId, quality)
  console.log('updateDeckSuccess = ', updateDeckSuccess, '\n' )

  return !!updateDeckSuccess;
};

module.exports = {
  didTheyVoteAlready,
  createVote,
  updateDeck,
  updateVote,
};
