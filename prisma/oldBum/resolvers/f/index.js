const DECK_FRAGMENT = `
  fragment DeckInfo on Deck {
    id
    deckName
    deckDetails
    deckList
    score
    raw
  }
`;

const USER_FRAGMENT = `
  fragment UserInfo on User {
    name
    email
    id
  }
`;

module.exports = {
  DECK_FRAGMENT,
  USER_FRAGMENT
}
