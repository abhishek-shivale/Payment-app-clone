import JWT_SECRET from "./config";
import { jwt } from "jsonwebtoken";

const authMiddelware = async (req,res,next)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.json({
            msg:'Header Error'
        })
    }
  try {
    const bearerToken = bearerHeader.split(' ')[1]
    let data = await jwt.verify(bearerToken, JWT_SECRET,(err,decoded)=>{
        if(err){ 
            res.status(403).json({
            msg:'Unauthorized Token!'
        })}
    })
    req.userId = data.userId
    next();
  } catch (error) {
    res.status(403).json(error.message)
  }
}
export default authMiddelware