// Mutations
const { m } = require('./m');
// Queries
const { q } = require('./q');

// const { Subscription } = require('./Subscription')

module.exports = {
  // Subscription,
  Query: {
    ...q,
  },
  Mutation: {
    ...m,
  },
}
