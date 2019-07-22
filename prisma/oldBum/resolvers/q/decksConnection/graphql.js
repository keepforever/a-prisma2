const { DECK_FRAGMENT, USER_FRAGMENT } = require("../../f")

const graphql = `
  query($first: Int!, $after: String) {
    decksConnection(
      first: $first,
      after: $after
    ) {
      pageInfo{
        hasNextPage
        endCursor
      }
      edges{
        node{
          ...DeckInfo
          author{
            ...UserInfo
          }
        }
      }
      aggregate{
        count
      }
    }
  }
  ${DECK_FRAGMENT}
  ${USER_FRAGMENT}
`;

module.exports = {
  graphql,
}
