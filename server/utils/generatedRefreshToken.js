import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generatedRefreshToken = async (userId) => {
  const token = await jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN, // Use a different secret key
    { expiresIn: "7d" } // Refresh tokens usually have longer validity
  );
  const updatedRefreshTokenUser = await UserModel.updateOne(
    { _id: userId },
    {
      refresh_token: token,
    }
  );
  return token;
};

export default generatedRefreshToken;
