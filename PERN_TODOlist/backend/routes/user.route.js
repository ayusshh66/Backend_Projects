import express from 'express';
import db from '../src/db.js'
import { todoTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';

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

router.get('/',async(req,res) => {
    const data = await db.select().from(todoTable)

    return res.status(200).json(data);
})

router.get('/:id', async(req,res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({error : `Provide Id`})
    }

    

    const [data] = await db.select().from(todoTable).where(eq(todoTable.id,id));

    if (!data) {
        return res.status(404).json({
            error: "There is no todo with this id"
        });
    }

    return res.status(200).json(data);
})

router.patch('/:id', async(req,res) => {
    const {id} = req.params;
    const {description, completed} = req.body;

    if(!id){
        return res.status(400).json({error : `Provide Id`})
    }

    const [result] = await db.update(todoTable).set({description, completed}).where(eq(todoTable.id,id)).returning();

    if(!result){
        return res.status(400).json({error : `todo not found`})
    }

    return res.status(200).json({status : "successful", result});
})

export default router;