import Photon from "@generated/photon";

const photon = new Photon();

async function main() {
    // Open connection to database
    await photon.connect();

    const newUser = await photon.users.create({
        data: {
            email: "david@prisma.io",
            posts: {
                create: [
                    { title: "David's first post", isGood: false },
                ]
            },
            profile: {
                create: {
                    description: "David's profile description",
                    isVerified: false
                }
            }
        }
    });
    console.log("\n", "\n", `newUser = `, newUser, "\n", "\n");

    // You'll write your Photon code here
    await photon.users.create({
      data: {
        name: 'Brian',
        email: 'brian@prisma.io'
      }
    })

    const newUserTwo = await photon.users.create({
        data:{
            name: 'Brian Kong',
            email: 'Brian@Kong.io'
        }
    })
    console.log(newUserTwo)

    const newPost = await photon.posts.create({
      data: { title: 'Hello Prisma 2' }
    })
    console.log(newPost)

    // const allPosts = await photon.posts.findMany()
    // console.log(allPosts)

    await photon.posts.create({
        data: {title: 'Hello Post ONE'}
    });

    await photon.posts.create({
        data: {title: 'Hello Post TWO'}
    });
    let dontDupUser = {};
    try {
        dontDupUser = await photon.users.findOne({
            where: { email: "brian@prisma.io" }
        });
    } catch (e) {
        console.log("\n", "\n", `e = `, e, "\n", "\n");
    }
    console.log("\n", "\n", `dontDupUser = `, dontDupUser, "\n", "\n");

    console.log(
        "\n",
        "\n",
        `Object.keys(dontDupUser) = `,
        Object.keys(dontDupUser),
        "\n",
        "\n"
    );

    if (!Object.keys(dontDupUser).length) {
        console.log("\n", `no keys `, "\n");
        const newUser = await photon.users.create({
            data: {
                email: "brian@prisma.io",
                posts: {
                    create: [
                        { title: "Join the Prisma Slack on https://slack.prisma.io" },
                        { title: "Follow @prisma on Twitter" }
                    ]
                }
            }
        });
        console.log("\n", "\n", `newUser = `, newUser, "\n", "\n");
    }

    // x

    // console.log("\n", "\n", `newUser = `, newUser, "\n", "\n");

    const postsByUser = await photon.users
        .findOne({ where: { email: "brian@prisma.io" } })
        .posts();

    console.log(`
  #########################################################
                  PostsByUser
  #########################################################
  `);

    console.log("\n", "\n", `PostsByUser = `, postsByUser, "\n", "\n");

    console.log(`
  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  #########################################################
  `);

    const posts = await photon.users
        .findOne({
            where: { email: "brian@prisma.io" }
        })
        .posts({
            where: {
                title: {
                    contains: "Join"
                }
            }
        });

    console.log(`
    #########################################################
                    Posts Starts With
    #########################################################
    `);

    console.log("\n", "\n", `posts = `, posts, "\n", "\n");

    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);

    const allPosts = await photon.posts.findMany();
    console.log("\n", "\n", `allPosts = `, allPosts, "\n", "\n");

    const allUsers = await photon.users.findMany();
    console.log("\n", "\n", `allUsers = `, allUsers, "\n", "\n");

    // Close connection to database
    await photon.disconnect();
}

main();
