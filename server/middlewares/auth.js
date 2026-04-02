import jwt from "jsonwebtoken";

const auth = async (request, response, next) => {
  try {
    // 1️⃣ Get token from Authorization header or cookies
    const token =
      request.cookies.accessToken ||
      request?.headers?.authorization?.split(" ")[1];
    // if (!token) {
    //   token = request.query.token;
    // }
    if (!token) {
      return response.status(401).json({
        message: "No token provided, please login first.",
        error: true,
        success: false,
      });
    }

    // 2️⃣ Verify token using secret key
    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    if (!decode) {
      return response.status(401).json({
        message: "Unauthorized Access",
        error: true,
        success: false,
      });
    }
    // 3️⃣ Attach user info to request for further routes
    request.userId = decode.id;

    // 4️⃣ Pass control to next middleware/route
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    return response.status(401).json({
      message: "Invalid or expired token, please login again.",
      error: true,
      success: false,
    });
  }
};

export default auth;
