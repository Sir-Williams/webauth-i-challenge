const express = require('express');
const router = express.Router();
const Users = require('./Router-Model.js');

const restricted = require('./restrictedMiddleware.js')


module.exports = router;

router.get('/', restricted, (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: "Error getting users." })
        })
})

