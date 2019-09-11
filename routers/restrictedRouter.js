const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./Router-Model.js');

router.post('/register', (req, res) => {
    let user = req.body;

    user.password = bcrypt.hashSync(user.password, 10)

    Users.add(user)
        .then(registered => {
            const token = generateToken(registered)
            res.status(201).json({
                user: registered,
                token
            })
        })
        .catch(err => {
            res.status(500).json({ error: 'Error logging in' });
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.find({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)

            res.status(200).json({ message: "Succeful login", token})
        } else {
            res.status(401).json({ message: "incorrect password and/or username" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Error logging in' });
    })
})

function generateToken(user) {
    const payload = {
        sub: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;