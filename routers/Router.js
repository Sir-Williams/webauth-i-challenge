const express = require('express');
const router = express.Router();
const Users = require('./Router-Model.js');


module.exports = router;

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: "Error getting users." })
        })
})

