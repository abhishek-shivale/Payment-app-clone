import JWT_SECRET from "./config.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({
      msg: 'Header Error'
    });
  }

  try {
    const bearerToken = authHeader.split(' ')[1];
    let data = jwt.verify(bearerToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          msg: 'Unauthorized Token!'
        });
      }
      req.userId = decoded.userId;
      next();
    });
 
    
  } catch (error) {
    return res.status(403).json(error.message);
  }
};

export default authMiddleware;
