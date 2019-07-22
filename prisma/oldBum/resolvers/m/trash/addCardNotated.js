const bcrypt = require("bcryptjs");
const mtg = require("mtgsdk");
const { clearLog } = require("../../../utils");
const { testCards } = require("../boiler/testString");
const { testCard } = require("../boiler/testString");

async function addCard(parent, args, ctx) {
  let deckMap = {};

  // console.log(testCards)
  // testCards.split("\n").forEach(card => {
  //   // extract quantity from leading numbers
  //   const quantity = card.match(/[0-9]* /);
  //   console.log('quantity = ', quantity, '\n' )
  //   // remove (RIX)
  //   const editCard  = card.replace(/ *\([^)]*\) */g, "");
  //   // remove all numbers and trim space,
  //   const cardName = editCard.replace(/[0-9]/g, "").trim()
  //   console.log(cardName, '\n' )
  //   console.log('editCard = ', editCard, '\n' )
  //
  // })

  const quantity = testCard.match(/[0-9]*/);
  console.log("quantity = ", quantity, "\n");
  // remove (RIX)
  const editCard = testCard.replace(/ *\([^)]*\) */g, "");
  // remove all numbers and trim space,
  const cardName = editCard.replace(/[0-9]/g, "").trim();
  console.log(cardName, "\n");
  console.log("editCard = ", editCard, "\n");

  let fetchedCard;
  try {
    fetchedCard = await mtg.card.where({
      name: `${cardName}`,
      pageSize: 1
    });
  } catch (e) {
    console.log("e = ", e, "\n");
  }

  console.log("fetchedCard = ", fetchedCard[0], "\n");

  const {
    name,
    manaCost,
    colors,
    type,
    rarity,
    text,
  } = fetchedCard[0]

  const card = {
    name,
    manaCost,
    colors,
    type,
    rarity,
    text,
  };

  console.log('cardToCreate = ', card, '\n' )

  return true;
}

module.exports = {
  addCard
};

// const set = await mtg.set.find("AER");
// console.log("set = ", set, "\n");

// const card = await mtg.card.where({ name: "Gaea\'s Blessing", pageSize: 1 });
//
// console.log("card = ", card, "\n");

// const aetherRevolt = await mtg.set.find("AER")
//
// clearLog('AER.booster', aetherRevolt.set.booster)
//
// Object.keys(aetherRevolt.set.booster).forEach((key) => {
//   console.log('key = ', key, '\n' )
// })

// const blackLotus = await mtg.card.where({ name: 'Lotus', pageSize: 1})
//
// const lotusObj = blackLotus[0];

// Object.keys(blackLotus[0]).forEach(key => {
//   console.log('blackLotus[0][key] = ', blackLotus[0][key], '\n' )
// })

// Object.keys(lotusObj).forEach( key => {
//   console.log(`lotusObj[${key}] = `, lotusObj[key], '\n' )
// })
