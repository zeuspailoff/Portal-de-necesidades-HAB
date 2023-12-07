import express from 'express';
import routes from './routes/index.routes.js';
import dotenv from 'dotenv';


dotenv.config();

const app = express();
app.use(routes);


app.listen(8080, () => {
    console.log('Server running on port 8080: http://localhost:8080')
});