import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes.js';
import dotenv from 'dotenv';

const port = 8080;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.listen(port, () => {
    console.log(`Server running on port ${port}: http://localhost:${port}`);
});