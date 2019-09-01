const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, clearLog } = require('../../utils')

function createToken(userId) {
  return jwt.sign({ userId, expiresIn: "7d" }, process.env.APP_SECRET)
}

async function userSignup (parent, args, ctx) {
    const password = await bcrypt.hash(args.password, 5)
    clearLog('password', password)

    const user = await ctx.prisma.createUser({ ...args, password })

    clearLog('user', user)

    const token = createToken(user.id)

    clearLog('token', token)

    return {
      token,
      user,
    }
};

module.exports = {
  userSignup,
}
