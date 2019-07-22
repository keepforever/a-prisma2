const { graphql } = require('./graphql')

async function decksConnection(parent, args, ctx) {
  console.log('decksConnection args = ', args, '\n' )

  const result = await ctx.prisma.$graphql(
    graphql,
    {...args}
  );

  // console.log('result.decksConnection.edges = ', result.decksConnection.edges, '\n' )

  return result.decksConnection
};


module.exports = {
  decksConnection,
}


// console.log(
//   'ctx.request.headers = ',
//   Object.keys(ctx.request.headers), '\n'
// );
