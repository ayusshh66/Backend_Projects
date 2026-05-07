// import express from 'express'
import jwt from 'jsonwebtoken'

export const authenticatedMiddleware = async (req,res,next) => {
    try{
        const tokenHeader = req.headers['authorization']
        
        if(!tokenHeader){
            next()
        }
        if(!tokenHeader.startsWith('Bearer')){
            return res.status(400).json({message : `the header must be start with "Bearer" `})
        }

        const token = tokenHeader.split(" ")[1];
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded;

        next()

    }catch(err){
        next()
    }
}

export const ensureAuthentication = async (req,res,next) => {
    const user = req.user  ;
    if(!user) {
        return res.status(401).json({ error : "you must be authenticated first"})
    }
    next()
}

export const restrictRole = (role) => {
    return function (req,res,next) {
        if(!req.user.role != role){
        return res.status(401).json({message : "you are not authorized as admin"})
    }
    return next();
    }
}