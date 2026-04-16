import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "629e2ueeij39eu9"
    );

    req.userId = decoded.id;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token"
    });

  }

};