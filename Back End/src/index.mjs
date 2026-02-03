import express from 'express'
import cors from 'cors'
import pgPromise from 'pg-promise'

import dotenv from 'dotenv'
dotenv.config({ path: './.env'});

import authRouter from './routes/auth.mjs'
import projectRouter from './routes/project.mjs'
import timeEntryRouter from './routes/timeEntry.mjs';

const app = express();
const pgp = pgPromise();

app.set('trust proxy', 1);

app.use(express.json())

export const db = pgp(process.env.NEON_CONNECTION_STRING);

// Test DB Connection
db.connect().then(obj => {
    const serverVersion = obj.client.serverVersion;
    obj.done();
    console.log("Server Connected to Database! Version: " + serverVersion);
}).catch(error => {
    console.log('ERROR: ', error.message || error);
})

app.use('/auth/', authRouter);
app.use('/project/', projectRouter);
app.use('/timeEntry/', timeEntryRouter);

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});