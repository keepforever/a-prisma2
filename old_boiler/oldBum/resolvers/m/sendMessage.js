const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId } = require("../../utils");

async function sendMessage(parent, args, ctx) {

  const id = getUserId(ctx);
  
  const { type, recipient, text } = args;

  const author = await ctx.prisma.user({ id });

  console.log('author = ', author, '\n' )

  const newMessage = await ctx.prisma.createMessage({
    recipient: {
      connect: {
        id: recipient
      }
    },
    author: {
      connect: {
        id: author.id
      }
    },
    type,
    text
  })

  console.log('newMessage = ', newMessage, '\n' )

  if(!newMessage) {
    return false
  }

  return true;
}

module.exports = {
  sendMessage
};
