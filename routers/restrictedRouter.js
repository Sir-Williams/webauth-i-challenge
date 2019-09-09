const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./Router-Model.js');
const restricted = require('./restrictedMiddleware.js')

router.post('/register', (req, res) => {
    let user = req.body;

    user.password = bcrypt.hashSync(user.password, 10)

    Users.add(user)
        .then(registered => {
            res.status(201).json(registered)
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
            req.session.user = user;

            res.status(200).json({ message: "Succeful login"})
        } else {
            res.status(401).json({ message: "incorrect password and/or username" })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Error logging in' });
    })
})

router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.json({ message: 'There was an error' });
            }
            else {
                res.end();
            }
		});
	} 
});

module.exports = router;