const express = require('express');
const Router = require('./routers/Router.js');
const Restricted = require('./routers/restrictedRouter.js')
const server = express();
const session = require('express-session')
const connectSessionStore = require ('connect-session-knex')
const db = require('./data/dbConfig.js')

const knexSessionStore = connectSessionStore(session)

const sessionConfig = {
    name: 'user session',
    secret: 'the opposite of yeet is to yoink',
    coockie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new knexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidefieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

server.use(express.json())
server.use(session(sessionConfig))

server.use('/api/restricted', Restricted)
server.use('/api/users', Router)



module.exports = server;