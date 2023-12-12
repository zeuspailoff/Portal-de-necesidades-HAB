import express from 'express';
import routes from './routes/index.routes.js';
import dotenv from 'dotenv';
import multer from 'multer';


dotenv.config();

const app = express();
app.use(multer)
app.use(express.json());
app.use(routes);


app.listen(8080, () => {
    console.log('Server running on port 8080: http://localhost:8080')
});