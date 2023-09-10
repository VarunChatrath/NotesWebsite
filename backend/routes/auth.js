const express = require('express')

const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "Varunisagoodb$oy"


// Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be of 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id, name: user.name,
            }
        }
        var authtoken = jwt.sign(data, JWT_SECRET);

        success = true
        res.json({ success, authtoken, data })

    } catch (error) {

        console.error(error.message)
        res.status(500).send("Some error occurred")

    }


}

)
// Route 2: Create a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid name').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id, name: user.name,
            }
        }
        var authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken, data })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
}
)


// Route 3: Get logged in User details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send({ user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router