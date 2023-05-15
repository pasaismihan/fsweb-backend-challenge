const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/config");
const userModel = require("../Users/users.model");

function protected(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decodedJWT) => {
        if (err) {
          next({ status: 401, message: "Invalid token" });
        } else {
          req.decodedJWT = decodedJWT;
          next();
        }
      });
    } else {
      res.json({ message: "No Token! Login or Register Please" });
    }
  } catch (error) {
    next(error);
  }
}
function PasswordCheck(req, res, next) {
  try {
    if (bcrypt.compareSync(req.body.password, req.user.password)) {
      next();
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
}
function payloadCheck(req, res, next) {
  try {
    const user = req.body;
    if (!user.password || user.password.length < 4) {
      next({
        status: 400,
        message: "Password information is missing",
      });
    } else if (!user.username || user.username.trim().length < 4) {
      next({ status: 400, message: "Not a proper username" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkRole = (role) => (req, res, next) => {
  if (req.decodedJWT.role == role) {
    next();
  } else {
    next({
      status: 403,
      message: "Not authorized",
    });
  }
};

async function generateToken(req, res, next) {
  try {
    const payload = {
      userId: req.user.id,
      role: req.user.role,
      username: req.user.username,
    };
    const options = {
      expiresIn: "10h",
    };
    const token = jwt.sign(payload, JWT_SECRET, options);
    req.user.token = token;
    console.log(token);
    next();
  } catch (error) {
    next(error);
  }
}
async function RegisteredUserCheck(req, res, next) {
  try {
    const { username } = req.body;
    const user = await userModel.getUserByFilter({
      username: username,
    });
    if (user.length > 0) {
      //req.user
      req.user = user[0];
      next();
    } else {
      res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  protected,
  payloadCheck,
  checkRole,
  generateToken,
  RegisteredUserCheck,
  PasswordCheck,
};
