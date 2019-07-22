const mtg = require("mtgsdk");

function isSplitCard(card) {
  let regex = /\/\//;
  // console.log(`regex.test(${card}) =` , regex.test(card), '\n' )
  return regex.test(card);
}

function nameAndQuant(c) {
  const [quantity] = c.match(/[0-9]*/);
  const editCard = c.replace(/ *\([^)]*\) */g, "").slice(0, -3);
  console.log('nameAndQuant: editCard = ', editCard, '\n' )
  const cardName = editCard.replace(/[0-9]/g, "").trim();
  console.log('nameAndQuant: cardName = ', cardName, '\n' )
  return [quantity, cardName];
}

function nameAndQuantSplit(c) {

  const cardStringArray = c.split(" ");
  const number = cardStringArray[cardStringArray.length - 1];
  // console.log('number = ', number, '\n'
  const [quantity] = c.match(/[0-9]*/);
  const regex = /[a-z]* \/\/ [a-z]*/i;
  const [splitCardName] = c.match(regex);
  const [_, setCode] = c.match(/\(([^)]+)\)/);
  // console.log("setCode = ", setCode, "\n");
  // console.log("splitCardName = ", splitCardName, "\n");
  let cards = splitCardName.split(" ").filter(el => {
    return el !== "//";
  });

  const cardKey = cards.join("_")

  return {
    cardNames: cards,
    quantity,
    cardKey,
    number,
    setCode,
  };
}

function buildCardObj(c, quantity) {
  const { name, manaCost, colors, type, rarity, text, imageUrl } = c;
  return {
    name,
    manaCost,
    colors,
    type,
    rarity,
    text,
    imageUrl,
    quantity
  };
}

function isBasicLand(c) {

  const editCard = c.replace(/ *\([^)]*\) */g, "");
  const cardName = editCard.replace(/[0-9]/g, "").trim();

  if (
    cardName.toLowerCase() === "swamp" ||
    cardName.toLowerCase() === "forest" ||
    cardName.toLowerCase() === "island" ||
    cardName.toLowerCase() === "plains" ||
    cardName.toLowerCase() === "mountain"
  ) {
    return true;
  } else {
    return false;
  }
}

async function fetchSplitCard(card){

  const { cardNames, quantity, cardKey, number, setCode } = nameAndQuantSplit(card)
  let splitArray;
  try {
    splitArray = await mtg.card.where({
      set: setCode,
      number,
      pageSize: 2
    });
    // console.log('splitArray = ', splitArray, '\n' )
  } catch (e) {
    console.log('e = ', e, '\n' )
  }

  if(splitArray.length === 0) {
    return false
  }

  const splitCard = {
    quantity,
    isSplitCard: true,
  }

  for ( let i=0; i < 2; i++) {
    const builtCard = buildCardObj(splitArray[i], quantity);
    splitCard[splitArray[i].name] = builtCard;
  }

  return splitCard
}

module.exports = {
  buildCardObj,
  nameAndQuant,
  isBasicLand,
  isSplitCard,
  nameAndQuantSplit,
  fetchSplitCard
};
