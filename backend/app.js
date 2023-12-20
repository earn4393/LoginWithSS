//  import libary
import express from 'express'
import basicAuth from 'express-basic-auth'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors'



// set http request
const app = express();
app.use(express.json());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//     );
//     res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE"
//     );
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET"],
    credentials: true
}
))

app.use(cookieParser())
app.use(session(
    {
        secret: 'earn@ASI123',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 86400000
        }
    }
))

// set port
const port = process.env.port || 3001;
app.listen(port, () => console.log('Listening on port', port))

// set authenticate
const auth = basicAuth({
    users: {
        admin: '123',
        user: '456',
    },
});

// function api

// auth user
app.get('/auth', auth, (req, res) => {

    if (req.auth.user === 'admin') {
        req.session.username = 'admin'
        res.send({ state: 'admin' })
    } else {
        req.session.username = 'user'
        res.send({ state: 'user' })
    }
});

// check state user in session
app.get('/read-session', (req, res) => {
    if (req.session.username == 'admin') {
        res.send({ state: 'admin' })
    } else {
        res.send({ state: 'user' })
    }
});

// delete session state user
app.get('/logout', (req, res) => {
    // ลบ session 
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send(false)
        } else res.send(true)
    });
});

