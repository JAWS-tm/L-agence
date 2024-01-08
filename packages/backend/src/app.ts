import express from 'express';
// import logger from "morgan";
// import cors from "cors";
import appRouter from './routes';
import { User } from './models/User';

// Create Express server
const app = express();

// app.use(logger("dev"));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * Primary app routes.
 */

app.use('/api/', appRouter);

export default app;
