const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //Check if name was entered
        if(!name) {
            return res.json({
                error: 'Name is required.'
            })
        }
        //Check if password is good
        if(!password || password.length < 8) {
            return res.json({
                error: 'Password is required and should be at least 8 characters long.'
            })
        }
        //Check email
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: 'Email is taken already.'
            })
        }

        const hashedPassword = await hashPassword(password)
        // Create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        // Check if user exists
        const user = await User.findOne({email})
        if(!user) {
            return res.json({
                error: 'No user found.'
            })
        }

        // Check if password matches
        const match = await comparePassword(password, user.password)
        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
            
        } else {
            res.json({
                error: "Password do not match."
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = async (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const addVisitedCountry = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token missing" });
        }

        const decodedToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { country } = req.body;
       
        const index = user.visitedCountries.indexOf(country);

        if (index !== -1) {
            user.visitedCountries.splice(index, 1);
        } else {
            user.visitedCountries.push(country);
        }
        await user.save();

        return res.status(200).json({ message: "Visited country added successfully", user });
    } catch (error) {
        console.error("Error adding visited country:", error);
        return res.status(500).json({ error: "Could not add visited country" });
    }
};

const getUserCountries = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token missing" });
        }

        const decodedToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ visitedCountries: user.visitedCountries, countriesToVisit: user.countriesToVisit });
    } catch (error) {
        console.error("Error getting visited countries:", error);
        return res.status(500).json({ error: "Could not get visited countries" });
    }
};

const addCountriesToVisit = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Token missing" });
        }

        const decodedToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

        if (!decodedToken || !decodedToken.id) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const { country } = req.body;

        const index = user.countriesToVisit.indexOf(country);

        if (index !== -1) {
            user.countriesToVisit.splice(index, 1);
        } else {
            user.countriesToVisit.push(country);
        }
        await user.save();

        return res.status(200).json({ message: "Country added to visit list successfully", user });
    } catch (error) {
        console.error("Error adding country to visit list:", error);
        return res.status(500).json({ error: "Could not add country to visit list" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    addVisitedCountry,
    addCountriesToVisit,
    getUserCountries
}