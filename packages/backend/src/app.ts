import express from 'express';
// import logger from "morgan";
import cors from 'cors';
import session from 'express-session';
import appRouter from './routes';
import { User } from './models/User';

// Create Express server
const app = express();

// app.use(logger("dev"));
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(
  session({
    secret: 'lagence',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * Primary app routes.
 */

app.use('/api/', appRouter);

export default app;
