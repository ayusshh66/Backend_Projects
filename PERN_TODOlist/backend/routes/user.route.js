import express from 'express';
import db from '../src/db.js'
import { todoTable } from '../models/user.model.js';
const router = express.Router();

router.post('/', async(req,res) => {
    try {
        const {description, completed} = req.body;

    const [result] = await db.insert(todoTable).values({
                    description : description,
                    completed : completed}).returning()
    
    return res.status(201).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json(`Server Error`)
    }
})

export default router;