const gql = require("graphql-tag");

const didAlreadyVoteQuery = `
  query($deckId: ID!, $userId: ID!) {
    votes(
      where:{
        deck: { id: $deckId},
        author: { id: $userId }
      }
    ) {
        id
        quality
        author{
          name
        }
      }
  }
  `;

  const createVoteMutation = `
      mutation($deckId: ID!, $userId: ID!, $quality: Boolean!) {
        createVote(
          data: {
            quality: $quality
            deck: { connect: { id: $deckId } }
            author: { connect: { id: $userId } }
          }
        ) {
          id
          quality
          deck {
            deckName
            score
          }
        }
      }
    `;

    const updateDeckMutation = `
        mutation($score: Int!, $id: ID!) {
          updateDeck(
            data: {
              score: $score
            },
            where: {
              id: $id,
            },
          ) {
              id
              deckName
              deckList
              deckDetails
              score
          }
        }
      `;


module.exports = {
  didAlreadyVoteQuery,
  createVoteMutation,
  updateDeckMutation
};
