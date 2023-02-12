"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import sessions
const express_session_1 = __importDefault(require("express-session"));
const mysql2_1 = __importDefault(require("mysql2"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const cookieParser = require('cookie-parser');
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const xssClean = require('xss-clean');
// my imports
const UserService_1 = __importDefault(require("./Service/UserService"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const AuthController_1 = __importDefault(require("./Controllers/AuthController"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const dbDescriptor_1 = require("./utils/dbDescriptor");
const conn = mysql2_1.default.createConnection(dbDescriptor_1.dbD);
const app = (0, express_1.default)();
// Data sanitization against XSS (cross site scripting) atacks
app.use(xssClean());
// Limits to 100 requests from one ip per hour - agains dos attacks
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
});
app.use('/login', limiter);
//Set up session
const MySQLStore = require('express-mysql-session')(express_session_1.default);
const sessionStore = new MySQLStore({}, conn.promise());
app.use((0, express_session_1.default)({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    unset: 'destroy',
    proxy: true,
    cookie: {
        maxAge: 600000,
        sameSite: 'none',
    },
}));
// Body parser - for security reasons the size of the body limited to 10kb
app.use(express_1.default.json({ limit: '10kb' }));
//Logger
if (process.env.NODE_ENV === 'development')
    app.use((0, morgan_1.default)('dev'));
// Cors
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(cookieParser());
// app.use((req, _res, next) => {
//   console.log(req.cookies);
//   next();
// });
// passport middleware
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.use(new LocalStrategy(async (username, password, done) => {
    try {
        const userDetails = await UserService_1.default.login(username, password);
        if (userDetails === null)
            return done(null, false);
        return done(null, userDetails);
    }
    catch (e) {
        done(e);
    }
}));
app.use(passport_1.default.session());
app.use(passport_1.default.initialize());
passport_1.default.serializeUser((userDetails, done) => {
    done(null, userDetails.id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        console.log('Deserialize');
        const user = await UserService_1.default.findUser(id);
        done(null, user);
    }
    catch (e) {
        done(e);
    }
});
app.use(AuthController_1.default.myDeserialize);
app.post('/login', passport_1.default.authenticate('local'), AuthController_1.default.login);
app.delete('/logout', AuthController_1.default.logout);
app.use('/api/v1/', apiRouter_1.default);
//Error handler
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});
