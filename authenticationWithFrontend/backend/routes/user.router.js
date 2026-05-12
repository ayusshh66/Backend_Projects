import express from 'express'
import db from '../src/index.js'
import {usersTable} from '../models/user.model.js'
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
        id,
        firstname,
        lastname,
        email,
        password : hashedPassowrd,
        salt : salt,
    }).returning({id: usersTable.id})

    return res.status(201).json({status : `success`, data : {userId : user.id}})
})

router.post('/login', async (req,res) => {
    const header = req.headers['authorization'];

    if(header )
})

export default router;