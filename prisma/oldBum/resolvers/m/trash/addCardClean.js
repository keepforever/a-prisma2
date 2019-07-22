const bcrypt = require("bcryptjs");
const mtg = require("mtgsdk");
const { clearLog } = require("../../../utils");
const { testCards } = require("../boiler/testString");
const { testCard } = require("../boiler/testString");

async function addCard(parent, args, ctx) {

  let deckMap = {};

  const quantity = testCard.match(/[0-9]*/);
  // remove (RIX)
  const editCard = testCard.replace(/ *\([^)]*\) */g, "");
  // remove all numbers and trim space,
  const cardName = editCard.replace(/[0-9]/g, "").trim();

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

  const stringifiedCard = JSON.stringify(card)

  console.log('stringifiedCard = ', stringifiedCard, '\n' )
  console.log('typeof stringifiedCard = ', typeof stringifiedCard, '\n' )

  return true;
}

module.exports = {
  addCard
};
