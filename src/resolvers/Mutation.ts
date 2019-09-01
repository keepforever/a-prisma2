import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { idArg, mutationType, stringArg, booleanArg } from 'nexus';
import { APP_SECRET, getUserId, createToken } from '../utils';
import { string } from 'yup';

export const Mutation = mutationType({
    definition(t) {
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                name: stringArg({ nullable: true }),
                email: stringArg(),
                password: stringArg(),
                isAdmin: booleanArg(),
                arenaHandle: stringArg()
            },
            resolve: async (
                _parent,
                { name, email, password, arenaHandle },
                ctx
            ) => {
                const hashedPassword = await hash(password, 10);
                const user = await ctx.photon.users.create({
                    data: {
                        name,
                        email,
                        arenaHandle,
                        password: hashedPassword
                    }
                });
                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user
                };
            }
        });

        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: stringArg(),
                password: stringArg()
            },
            resolve: async (_parent, { email, password }, context) => {
                const user = await context.photon.users.findOne({
                    where: {
                        email
                    }
                });
                if (!user) {
                    throw new Error(`No user found for email: ${email}`);
                }
                const passwordValid = await compare(password, user.password);
                if (!passwordValid) {
                    throw new Error('Invalid password');
                }
                return {
                    token: sign({ userId: user.id }, APP_SECRET),
                    user
                };
            }
        });

        t.field('refreshToken', {
            type: 'RefreshToken',
            args: {
                title: stringArg(),
                list: stringArg(),
                token: stringArg()
            },
            resolve: async (_parent, args, ctx) => {
                const userId = getUserId(ctx);
                return {
                    token: createToken(userId),
                    userId
                };
            }
        });

        t.field('deckAltList', {
            type: 'Deck',
            args: {
                altList: stringArg(),
                id: idArg()
            },
            resolve: async (_parent, { altList, id }, ctx) => {
                return ctx.photon.decks.update({
                    where: { id },
                    data: { altList }
                });
            }
        });

        t.field('deckAltCard', {
            type: 'Deck',
            args: {
                altCard: stringArg(),
                id: idArg()
            },
            resolve: async (_parent, { altCard, id }, ctx) => {
                return ctx.photon.decks.update({
                    where: { id },
                    data: { altCard }
                });
            }
        });

        t.field('createDeck', {
            type: 'Deck',
            args: {
                title: stringArg(),
                list: stringArg(),
                sideBoardList: stringArg()
            },
            resolve: async (_parent, { title, list, sideBoardList }, ctx) => {
                const userId = getUserId(ctx);

                return ctx.photon.decks.create({
                    data: {
                        list,
                        title,
                        sideBoardList,
                        author: { connect: { id: userId } }
                    }
                });
            }
        });
    }
});
