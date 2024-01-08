import express from 'express';
import routes from './routes/index.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import notFoundMiddleware from './middlewares/security/notFound.middleware.js';
import errorHandlerMiddleware from './middlewares/security/errorHandler.middleware.js';

dotenv.config();

const app = express();

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);



app.listen(8080, () => {
    console.log('Server running on port 8080: http://localhost:8080')
});