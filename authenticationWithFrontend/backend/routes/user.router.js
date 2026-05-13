import express from 'express'
import db from '../src/index.js'
import {usersTable} from '../models/user.model.js'
import {authentication} from '../middleware/auth.middleware.js';
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { createHmac, randomBytes } from 'crypto'

const router = express.Router()

router.post('/signup', async (req,res) => {
    const {firstname, lastname, email, password} = req.body;

    const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(existingUser){
        return res.status(400).json(`this ${email} is already registered, please login`)
    }

    const salt = randomBytes(256).toString('hex');
    const hashedPassowrd = createHmac('sha256', salt).update(password).digest('hex');

    const [user] = await db.insert(usersTable).values({
        
        firstname,
        lastname,
        email,
        password : hashedPassowrd,
        salt : salt,
    }).returning({id: usersTable.id})

    return res.status(201).json({status : `success`, data : {userId : user.id}})
})

router.post('/login', async (req,res) => {
    const {email, password} = req.body;

    const [existingUser] = await db.select({
            id : usersTable.id,
            password : usersTable.password,
            salt : usersTable.salt
             }).from(usersTable).where(eq(usersTable.email,email))
    
    if (!existingUser){
        return res.status(400).json(`this ${email} is not registered`)
    }

    const salt = existingUser.salt;
    const oldPassword = existingUser.password;

    const newHashedPassowrd = createHmac('sha256', salt).update(password).digest('hex');

    if (newHashedPassowrd !== oldPassword){
        return res.status(400).json({error : `the password is incorrect`})
    }

    const payload = {
        id : existingUser.id,
        email : existingUser.email,
        name : existingUser.firstname,
    }

    const token = jwt.sign(payload,process.env.JWT_SECRET);

    return res.status(200).json({data : {
        token : token,
    }})
})

router.post('/logout', async (req,res) => {
    return res.status(201).json({message : `you have been logged out`})
})

router.get('/me', authentication ,async (req,res) => {
    return res.status(200).json( req.user) 
})

export default router;