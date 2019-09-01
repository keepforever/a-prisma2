const bcrypt = require("bcryptjs");
const mtg = require("mtgsdk");
const { clearLog, getUserId } = require("../../../utils");
const {
  testDeck,
  fullTestDeck,
  testSplitDeck
} = require("../boiler/testString");
const {
  nameAndQuant,
  buildCardObj,
  isBasicLand,
  isSplitCard,
  nameAndQuantSplit,
  fetchSplitCard
} = require("./utils");

async function addDeck(parent, { deckList, deckDetails, deckName }, ctx) {
  const id = getUserId(ctx);

  if (!id) {
    return "no user found";
  }

  let deckMap = {};
  let count = 0;

  let cardsArray = deckList.split("\n").filter(el => {
    return el !== "";
  });

  console.log('cardsArray = ', cardsArray, '\n' )

  for (const card of cardsArray) {
    // console.log('card = ', card, '\n' )

    if (isBasicLand(card) && !isSplitCard(card)) {
      const [quantity, cardName] = nameAndQuant(card);
      const land = {
        name: cardName,
        quantity,
        type: "basic land"
      };
      deckMap[land.name] = land;
      count++;
    } else if (isSplitCard(card)) {
      // console.log("hello isSplitCard else-if", card);
      const { cardNames, quantity, cardKey } = nameAndQuantSplit(card);
      const fetchedSplitCard = await fetchSplitCard(card);

      if (!fetchedSplitCard) {
        const fallbackSplitCard = {
          name: cardKey,
          quantity,
          type: "split"
        };

        deckMap[cardKey] = fallbackSplitCard;
        count++;
        console.log("count = ", count, "\n");
      } else {
        deckMap[cardKey] = fetchedSplitCard;
        count++;
        console.log("count = ", count, "\n");
      }
    } else {
      let fetchedCard;
      try {
        const [quantity, cardName] = nameAndQuant(card);
        console.log('cardName = ', cardName, '\n' )
        fetchedCard = await mtg.card.where({
          name: `${cardName}`,
          pageSize: 1
        });
        const builtCard = buildCardObj(fetchedCard[0], quantity);

        deckMap[builtCard.name] = builtCard;
        count++;
        console.log("count = ", count, "\n");
      } catch (e) {
        console.log("hello catch block = ", e, "\n");
        let card = {};
        try {
          card.name = cardName;
          card.quantity = quantity;
        } catch(e) {
          return "error fatal"
        }
        card = {
          name: cardName,
          quantity
        };
        deckMap[card.name] = card;
        count++;
      }
    }
  }

  if (Object.keys(deckMap).length === cardsArray.length) {

    // this mutation takes the form which the Prisma API would find
    // acceptable
    const mutation = `
      mutation($raw: String!, $deckName: String!, $deckList: String!, $deckDetails: String!, $id: ID!) {
        createDeck(data: {
          raw: $raw,
          deckName: $deckName,
          deckList: $deckList,
          deckDetails: $deckDetails,
          author: { connect: { id: $id } }
        }) {
          id
          deckName
          deckList
          deckDetails
          score
          raw
        }
      }
    `;

    const variables = {
      deckList: JSON.stringify(deckMap),
      deckDetails,
      deckName,
      id,
      raw: deckList
    };

    const {createDeck} = await ctx.prisma.$graphql(mutation, variables);
    // console.log('\n', 'newDeck', '\n', '\n', createDeck )
    return JSON.stringify(createDeck);
  } else {
    return "something went wrong";
  }
}

module.exports = {
  addDeck
};
