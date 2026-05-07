// import express from 'express'
import jwt from 'jsonwebtoken'

export const authenticatedMiddleware = async (req,res,next) => {
    try{
        const tokenHeader = req.headers['authorization']
        
        if(!tokenHeader){
           return res.status(401).json({ error: "No token provided" })
        }
        if(!tokenHeader.startsWith('Bearer')){
            return res.status(400).json({message : `the header must be start with "Bearer" `})
        }

        const token = tokenHeader.split(" ")[1];
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;
        console.log("DECODED:", JSON.stringify(decoded))


        return next()

    }catch(err){
                console.log("JWT ERROR:", err.message) 

      return res.status(401).json({ error: "Invalid or expired token" }) // error, not next()
    }
}

export const ensureAuthentication = async (req,res,next) => {
    const user = req.user  ;
    if(!user) {
        return res.status(401).json({ error : "you must be authenticated first"})
    }
   return next()
}

export const restrictRole = (role) => {
    return function (req,res,next) {
        console.log("USER ROLE:", req.user.role)
        console.log("REQUIRED ROLE:", role)
        if(req.user.role !== role){
        return res.status(401).json({message : "you are not authorized as admin"})
    }
    return next();
    }
}