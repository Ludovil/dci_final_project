import jwt from 'jsonwebtoken';
import UserCollection from "../models/userSchema.js";



export const auth = async(req, res, next) => {
    try{ 

        
    const token = req.headers.token; 
    //verify token
    const payload = jwt.verify(token, process.env.SIGNATURE) //returns payload
    //const user = { _id: user._id, email: user.email }, //this is  payload that we created in userController
    const user = await UserCollection.findById(payload._id)
    //attach payload to req object
    req.user = user
    next()
    

 }  catch(err){
    res.json({success:false, message: err.message})
 
 }
}