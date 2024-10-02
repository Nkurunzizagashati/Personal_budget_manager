import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './utils/db.js';

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

// CONNECT TO DB

dbConnection();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
