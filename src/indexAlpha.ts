import Photon from "@generated/photon";

const photon = new Photon();

async function main() {
    // Open connection to database
    await photon.connect();

    console.log(`
    #########################################################
                    Index.ts
    #########################################################
    `);


    const allPosts = await photon.posts.findMany();
    console.log("\n", "\n", `allPosts = `, allPosts, "\n", "\n");

    const allUsers = await photon.users.findMany();
    console.log("\n", "\n", `allUsers = `, allUsers, "\n", "\n");


    console.log(`
    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #########################################################
    `);

    // Close connection to database
    await photon.disconnect();
}

main();
