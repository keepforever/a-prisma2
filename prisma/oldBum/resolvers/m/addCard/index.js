const bcrypt = require("bcryptjs");
const mtg = require("mtgsdk");
const { clearLog } = require("../../../utils");
const { testDeck, fullTestDeck, testSplitDeck } = require("../boiler/testString");
const {
  nameAndQuant,
  buildCardObj,
  isBasicLand,
  isSplitCard,
  nameAndQuantSplit,
  fetchSplitCard
} = require("./utils");

async function addCard(parent, args, ctx){
  let deckMap = {};
  let count = 0;

  // let cardsArray = testSplitDeck.split("\n");
  // let cardsArray = testDeck.split("\n");
  let cardsArray = fullTestDeck.split("\n");


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
      const { cardNames, quantity, cardKey } = nameAndQuantSplit(card)
      const fetchedSplitCard =  await fetchSplitCard(card);

      if(!fetchedSplitCard) {
        const fallbackSplitCard = {
          name: cardKey,
          quantity,
          type: "split"
        };

        deckMap[cardKey] = fallbackSplitCard;
        count++
        console.log('count = ', count, '\n' )

      } else {

        deckMap[cardKey] = fetchedSplitCard
        count++
        console.log('count = ', count, '\n' )
      }
    } else {
      
      let fetchedCard;
      try {
        const [quantity, cardName] = nameAndQuant(card);
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
        const card = {
          name: cardName,
          quantity
        };
        deckMap[card.name] = card;
        count++;
      }
    }
  }

  if (Object.keys(deckMap).length === cardsArray.length) {
    // console.log("done", "\n");
    console.log('count = ', count, '\n' )

    console.log("deckMap = ", deckMap, "\n");
    return JSON.stringify(deckMap);
  } else {
    return "something went wrong";
  }

  return "error";
}

module.exports = {
  addCard
};
