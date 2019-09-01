const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, createToken } = require('../../utils')

async function refreshToken (parent, args, ctx) {
    const userId = getUserId(ctx)

    console.log('userId = ', userId, '\n' )

    return {
      token: createToken(userId),
      userId,
    }
};

module.exports = {
  refreshToken,
}
