import jwt from "jsonwebtoken";

// short-lived token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

// long-lived token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    {
      id: userId
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  );
};

export {
  generateAccessToken,
  generateRefreshToken
};
