const bcrypt = require("bcryptjs");
const mtg = require("mtgsdk");
const { clearLog } = require("../../../../utils");
const { testDeck, fullTestDeck, testSplitDeck } = require("../../boiler/testString");
const {
  nameAndQuant,
  buildCardObj,
  isBasicLand,
  isSplitCard,
  nameAndQuantSplit
} = require("../addDeck/utils");

async function addCard(parent, args, ctx){
  let deckMap = {};
  let count = 0;

  let cardsArray = testSplitDeck.split("\n");
  // let cardsArray = testDeck.split("\n");
  // let cardsArray = fullTestDeck.split("\n");
  for (const card of cardsArray) {
    console.log('card = ', card, '\n' )

    const testSplitCard = isSplitCard(card)
    console.log('testSplitCard = ', testSplitCard, '\n' )


    // extract quantity from leading numbers
    // if(!isSplitCard(card)) {
    //   console.log(' not A split card = ', '\n' )
    //   const [quantity, cardName] = nameAndQuant(card);
    //   console.log('22 quantity = ', quantity, '\n' )
    //   console.log('22 cardName = ', cardName, '\n' )
    // }


    console.log('card 36 = ', card, '\n' )
    if (isBasicLand(card) && !isSplitCard(card)) {
      console.log('card 38 = ', card, '\n' )
      const [quantity, cardName] = nameAndQuant(card);
      const land = {
        name: cardName,
        quantity,
        type: "basic land"
      };
      deckMap[land.name] = land;
      count++;
    } else if (isSplitCard(card)) {
      console.log("hello isSplitCard");

      const { cardNames, quantity, cardKey } = nameAndQuantSplit(card)
      const splitCard = {
        quantity
      }
      for ( let i=0; i < 2; i++) {

        try {
          fetchedCard = await mtg.card.where({
            name: `${cardNames[i]}`,
            pageSize: 1
          });

          const builtCard = buildCardObj(fetchedCard[0], quantity);

          splitCard[i] = builtCard;

        } catch (e) {
          console.log("hello catch block = ", e, "\n");
          const card = {
            name: cardNames[i],
            quantity
          };
          splitCard[i] = card;
        }
      }

      console.log('splitCard = ', splitCard, '\n' )

      deckMap[cardKey] = splitCard;
      count++
      console.log('count = ', count, '\n' )

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
