const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserId, clearLog } = require("../../utils");

function createToken(userId) {
  return jwt.sign({ userId, expiresIn: "7d" }, process.env.APP_SECRET);
}

async function login(parent, { email, password }, ctx) {

  const user = await ctx.prisma.user({ email });
  // console.log("user = ", user, "\n");

  if (!user) {
    return {
      error: {
        field: "email",
        msg: "No user found"
      }
    };
  }

  const valid = await bcrypt.compare(password, user.password);
  clearLog("VALID ", valid);

  if (!valid) {
    return {
      error: {
        field: "email",
        msg: "Invalid Password"
      }
    };
  }

  return {
    payload: {
      token: createToken(user.id),
      user
    }
  };
}

module.exports = {
  login
};
