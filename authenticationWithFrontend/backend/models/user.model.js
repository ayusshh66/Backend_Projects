import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
    id : uuid().primaryKey().defaultRandom(),

    firstname : varchar('First_Name',{length : 255}).notNull(),
    lastname : varchar('Last_Name',{length : 255}),

    email : text().notNull(),

    password : text().notNull(),
    salt : text().notNull(),

    createdAt : timestamp('created-at').defaultNow().notNull(),
    updatedAt : timestamp('updated-at').$onUpdate(() => new Date())
})