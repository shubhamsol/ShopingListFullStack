const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

//User model
const User = require('../../models/User')

//route post User
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'enter all fields' })
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ msg: 'User does not exists' })
            }
            //create salt & hash
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'invalid crads' })
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 360 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
})
//rout get api/auth/user
//privet
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})


module.exports = router