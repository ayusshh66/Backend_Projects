import express from 'express'
import db from '../db/index.js'
import { usersTable } from '../db/schema.js';
import {ensureAuthentication, restrictRole, authenticatedMiddleware} from '../middleware/auth.middleware.js'
const router = express.Router();

const restrictAdmin = restrictRole('ADMIN')


router.get('/users', authenticatedMiddleware,ensureAuthentication,restrictAdmin,async (req,res) => {

    // if(!req.user){
    //     return res.status(401).json({error : `user must be authenticated to access this`})
    // }

    const users = await db.select({
        id : usersTable.id ,
        email: usersTable.email,
        name : usersTable.name,
    }).from(usersTable);

    return res.json({users})
})


export default router;