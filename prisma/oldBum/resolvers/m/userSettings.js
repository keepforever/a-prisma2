const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId, clearLog } = require("../../utils");

async function userSettings(parent, args, ctx) {

  const id = getUserId(ctx)
  
  const user = await ctx.prisma.user({ id });

  if(!user) {
    return false
  }

  const userSettings = await ctx.prisma.createUserSettings({
    user: {
      connect: {
        email: user.email
      }
    },
    ...args,
  });

  console.log('userSettings = ', userSettings, '\n' )


  return true
}

module.exports = {
  userSettings
};
