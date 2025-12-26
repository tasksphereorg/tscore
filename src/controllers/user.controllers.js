import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { generateAccessToken,generateRefreshToken } from "../utils/userhelper.js";


const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token not found");
  }

  let decoded;
  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findByPk(decoded.id);
  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  const newAccessToken = generateAccessToken(user);
  return res.status(200).json(
    new ApiResponse(
      200,
      { accessToken: newAccessToken },
      "Access token refreshed"
    )
  );
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, mobno } = req.body;

  if ([email, password, name, mobno].some(field => !field || String(field).trim() === "")) {
    throw new ApiError(400, `All fields are required`);
  }
  const existedUser = await User.findOne({
    where: { email }
  });
  if (existedUser) {
    throw new ApiError(409, `User already exists with email: ${email}`);
  }
try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      mobno,
      role: "STUDENT"
    });
  
    const responseUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobno: user.mobno,
      role: user.role,
      createdAt: user.createdAt
    };
  
    return res
      .status(200)
      .json(new ApiResponse(200, responseUser, `User registered successfully`));
} catch (error) {
      console.log(`Error Occured while registering the User ${error}`);
      throw new ApiError(500,`Internal Server Error, error : ${error}`)
}
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({
    where: { email }
  });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user.id);
  user.refreshToken = refreshToken;
  await user.save()

  const responseUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .json(
      new ApiResponse(
        200,
        {
          user: responseUser,
          accessToken
        },
        "User logged in successfully"
      )
    );
});

const userProfile = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new ApiError(401, "Unauthorized request");
  }
  const user = await User.findByPk(req.user.id, {
    attributes: ['id', 'name', 'email', 'mobno', 'role', 'createdAt', 'updatedAt']
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});



const userLogout = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  });

  return res.status(200).json(
    new ApiResponse(200, null, "User logged out successfully")
  );
});




export { 
  registerUser, 
  loginUser,
  refreshAccessToken,
  userProfile,
  userLogout
};
