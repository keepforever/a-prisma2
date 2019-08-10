import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { idArg, mutationType, stringArg, booleanArg } from "nexus";
import { APP_SECRET, getUserId, getUserIdWithoutAuthHeaders } from "../utils";
import { string } from "yup";

export const Mutation = mutationType({
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        name: stringArg({ nullable: true }),
        email: stringArg(),
        password: stringArg(),
        isAdmin: booleanArg(),
        arenaHandle: stringArg()
      },
      resolve: async (_parent, { name, email, password, arenaHandle }, ctx) => {
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

    t.field("login", {
      type: "AuthPayload",
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
          throw new Error("Invalid password");
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user
        };
      }
    });

    t.field("addAltDeckList", {
      type: "Deck",
      args: {
        altList: stringArg(),
        id: idArg()
      },
      resolve: async (_parent, { altList, id }, ctx) => {
        console.log('\n', '\n', '\n', 'Hello addAltDeckListResolver', '\n', '\n', '\n')
        return ctx.photon.decks.update({
                where: { id },
                data: { altList}
              })
      }
    });

    t.field("createDeck", {
      type: "Deck",
      args: {
        title: stringArg(),
        list: stringArg(),
        token: stringArg()
      },
      resolve: async (_parent, { title, list, token }, ctx) => {
        //   const userId = getUserId(ctx)
        //   const user = await ctx.photon.users.findOne({
        //   where: {
        //     id: userId
        //   }
        // });
        // if (!user) {
        //   throw new Error(`No user found for id: ${userId}`);
        // }

        const userId = getUserIdWithoutAuthHeaders(token)

        return ctx.photon.decks.create({
            data: {
                list,
                title,
                author: { connect: {id: userId } }
            }
        })
      }
    });



    // t.field('createDraft', {
    //   type: 'Post',
    //   args: {
    //     title: stringArg(),
    //     content: stringArg({ nullable: true }),
    //   },
    //   resolve: (_parent, { title }, ctx) => {
    //     const userId = getUserId(ctx)
    //     return ctx.photon.posts.create({
    //       data: {
    //         title,
    //         published: false,
    //         author: { connect: { id: userId } },
    //       },
    //     })
    //   },
    // })

    // t.field('createProfile', {
    //   type: 'Profile',
    //   args: {
    //     description: stringArg(),
    //     isVerified: booleanArg(),
    //   },
    //   resolve: (_parent, { description, isVerified }, ctx) => {
    //     const userId = getUserId(ctx)
    //     return ctx.photon.profiles.create({
    //       data: {
    //         description,
    //         isVerified,
    //         author: { connect: { id: userId } },
    //       },
    //     })
    //   },
    // })

    // t.field('deletePost', {
    //   type: 'Post',
    //   nullable: true,
    //   args: { id: idArg() },
    //   resolve: (_parent, { id }, ctx) => {
    //     return ctx.photon.posts.delete({
    //       where: {
    //         id,
    //       },
    //     })
    //   },
    // })

    // t.field('publish', {
    //   type: 'Post',
    //   nullable: true,
    //   args: { id: idArg() },
    //   resolve: (_parent, { id }, ctx) => {
    //     return ctx.photon.posts.update({
    //       where: { id },
    //       data: { published: true },
    //     })
    //   },
    // })
  }
});
