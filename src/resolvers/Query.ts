import { idArg, queryType, stringArg, intArg } from 'nexus';
import { getUserId } from '../utils';

export const Query = queryType({
    definition(t) {
        t.field('me', {
            type: 'User',
            resolve: (_parent, _args, ctx) => {
                const userId = getUserId(ctx);

                if (!userId) {
                    throw new Error('No user found at the given Id');
                    return null;
                }
                return ctx.photon.users.findOne({
                    where: {
                        id: userId
                    }
                });
            }
        });

        t.field('overComplexMe', {
            type: 'User',
            resolve: async (_parent, _args, ctx) => {
                const userId = getUserId(ctx);
                const whoAmI = await ctx.photon.users.findOne({
                    where: {
                        id: userId
                    }
                });

                const decks = await ctx.photon.users
                    .findOne({
                        where: {
                            id: userId
                        }
                    })
                    .decks();

                return ctx.photon.users.findOne({
                    where: {
                        email: whoAmI.email
                    }
                });
            }
        });

        t.field('singleDeck', {
            type: 'Deck',
            nullable: true,
            args: { id: idArg() },
            resolve: (_parent, { id }, ctx) => {
                return ctx.photon.decks.findOne({
                    where: {
                        id
                    }
                });
            }
        });

        t.list.field('feedUsers', {
            type: 'User',
            resolve: (_parent, _args, ctx) => {
                return ctx.photon.users.findMany();
            }
        });

        t.list.field('feedDecks', {
            type: 'Deck',
            resolve: (_parent, _args, ctx) => {
                return ctx.photon.decks.findMany();
            }
        });

        t.list.field('deckConnection', {
            type: 'Deck',
            args: {
                first: intArg(),
                last: stringArg()
            },
            resolve: (_parent, args, ctx) => {
                const { first, last } = args;
                return ctx.photon.decks.findMany({
                    first: first,
                    after: last
                });
            }
        });

        // t.list.field('feed', {
        //   type: 'Post',
        //   resolve: (_parent, _args, ctx) => {
        //     return ctx.photon.posts.findMany({
        //       where: { published: true },
        //     })
        //   },
        // })

        // t.list.field('filterPosts', {
        //   type: 'Post',
        //   args: {
        //     searchString: stringArg({ nullable: true }),
        //   },
        //   resolve: (_parent, { searchString }, ctx) => {
        //     return ctx.photon.posts.findMany({
        //       where: {
        //         OR: [
        //           // {
        //           //   title: {
        //           //     contains: searchString,
        //           //   },
        //           // },
        //           {
        //             isGood: {
        //               equals: false
        //             }
        //           },
        //           {
        //             author: {
        //               name: {
        //                 contains: searchString
        //               }
        //             }
        //           }
        //         ],
        //       },
        //     })
        //   },
        // })
    }
});
