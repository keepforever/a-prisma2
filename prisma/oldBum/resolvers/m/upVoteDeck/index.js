const { clearLog, getUserId } = require("../../../utils");
const { didTheyVoteAlready, createVote, updateDeck, updateVote } = require("./utils");

async function upVoteDeck(parent, { deckId, quality }, ctx) {
  const userId = getUserId(ctx);

  if (!userId) {
    return "Cannot Up Vote Deck Without Auth Token";
  }

  const [alreadyVoted, sameVoteAsBefore] = await didTheyVoteAlready(
    ctx,
    userId,
    deckId,
    quality
  );

  if (alreadyVoted && sameVoteAsBefore) {
    return false;
  }

  if (alreadyVoted && !sameVoteAsBefore) {
    console.log('already voted, but dif quality = ', '\n' )
    const updateVoteSuccess = await updateVote(ctx, deckId, userId, quality);
  }

  if (!alreadyVoted) {
    const createVoteSuccess = await createVote(ctx, deckId, userId, quality);
  }

  const updateDeckSuccess = await updateDeck(ctx, deckId, quality);

  console.log("updateDeckSuccess = ", updateDeckSuccess, "\n");

  if (!updateDeck) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  upVoteDeck
};

// PRISMA CLIENT MUTATION DOESN'T WORK AS EXPECTED
// SOMETHING TO DO WITH INPUT FORMAT, ALSO SOME FORUM POSTS
// INDICATE IT COULD BE A BUG AND RAW GRAPHQL MIGHT
// BE THE WAY TO GO.

// DOSEN'T WORK, BUT SHOULD, OR IT'S DARN CLOSE;
// TODO: WRITE FORUM POST
// const newVote = await ctx.prisma.createVote({
//   deck: { connect: { id: "cjsnk5nj72xc10b23swm3ssnx" } },
//   author: { connect: { id: "cjsc9h8ujgtw50b09cefxxap2" } },
//   quality: quality
// });
