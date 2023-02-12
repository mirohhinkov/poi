import express from 'express';

// import sessions
import expressSession from 'express-session';

import mysql from 'mysql2';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import passport from 'passport';
import passportLocal from 'passport-local';
const cookieParser = require('cookie-parser');
import rateLimit from 'express-rate-limit';
const xssClean = require('xss-clean');

// my imports
import UserService from './Service/UserService';
import { User } from './Model/User';
import apiRouter from './routes/apiRouter';
import authController from './Controllers/AuthController';
import errorHandler from './utils/errorHandler';
import { dbD } from './utils/dbDescriptor';
const conn = mysql.createConnection(dbD);

const app = express();

// Data sanitization against XSS (cross site scripting) atacks
app.use(xssClean());

// Limits to 100 requests from one ip per hour - agains dos attacks
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
});
app.use('/login', limiter);

//Set up session
const MySQLStore = require('express-mysql-session')(expressSession);
const sessionStore = new MySQLStore({}, conn.promise());
app.use(
  expressSession({
    store: sessionStore,
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    unset: 'destroy',
    proxy: true,
    cookie: {
      maxAge: 600000, // 600000 ms = 10 mins expiry time
      sameSite: 'none',
    },
  })
);

// Body parser - for security reasons the size of the body limited to 10kb
app.use(express.json({ limit: '10kb' }));
//Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Cors
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
// app.use((req, _res, next) => {
//   console.log(req.cookies);
//   next();
// });

// passport middleware

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      const userDetails: User | null = await UserService.login(
        username,
        password
      );
      if (userDetails === null) return done(null, false);
      return done(null, userDetails);
    } catch (e) {
      done(e);
    }
  })
);
app.use(passport.session());
app.use(passport.initialize());
passport.serializeUser((userDetails: any, done) => {
  done(null, userDetails.id);
});
passport.deserializeUser(async (id: number, done) => {
  try {
    console.log('Deserialize');
    const user = await UserService.findUser(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

app.use(authController.myDeserialize);

app.post('/login', passport.authenticate('local'), authController.login);
app.delete('/logout', authController.logout);
app.use('/api/v1/', apiRouter);

//Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
