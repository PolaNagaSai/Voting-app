const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const { generateToken, jwtAuthMiddleware } = require("./../jwt")

// Check if the number is exactly 12 digits long and consists only of digits
const isValidAadhaar = (aadhaarNumber) => {
    const aadhaarRegex = /^\d{12}$/;
    return aadhaarRegex.test(aadhaarNumber);
};



//user signup route
router.post("/signup", async(req, res) => {

    try {
        // Assuming the request body contains the User data
        const data = req.body;

        //check admin role present or not
        const adminUser = await User.findOne({ role: 'admin' });

        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }


        // Validate Aadhar Card Number 
        if (!isValidAadhaar(data.aadharCardNumber)) {
            return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
        }

        // Check if a user with the same Aadhar Card Number already exists
        const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
        }

        //creating a New User with the data provided
        const newUser = new User(data);
        console.log(newUser);

        // Save the new user to the database
        const response = await newUser.save();


        // generate Token 
        const payload = {
            id: response.id
        }
        const token = generateToken(payload);

        res.status(200).json({ response: response, token: token });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


});

//user login route
router.post("/login", async(req, res) => {
    try {
        //Extract aadharCardNumber and Password.
        const { aadharCardNumber, password } = req.body;


        //check if both are empty return error
        if (!aadharCardNumber || !password) {
            return res.status(400).json({ error: "AadharCard number and password are mandatory" })
        }

        //find whether the given aadharCardNumber is present or not. 
        const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

        //if aadharCardNumber is present compare the password which is given .
        if (!user || !(await user.comparePassword(password))) {
            return res.status(403).json({ error: "Invalid AadharCard Number or Password" })
        }

        // generate Token 
        const payload = {
            id: user.id,
            role: user.role, // Include user role in payload
            // isVoted: user.isVoted // Include vote status
        }
        const token = generateToken(payload);

        // return token as response
        res.status(200).json({ 
            token,
            name:user.name,
            role: user.role, // Return user role
            isVoted: user.isVoted // Include vote status
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});


//user profile route
router.get("/profile", jwtAuthMiddleware, async(req, res) => {
    try {
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId)
        res.status(200).json({ user })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }


})


//updating the password from profile
router.put("/profile/password", jwtAuthMiddleware, async(req, res) => {
    try {
        //extract the userId from token
        const userId = req.user.id;

        //extract currentPassword and newPassword from request body
        const { currentPassword, newPassword } = req.body;

        //check Both currentPassword and newPassword fields are not empty
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Both currentPassword and newPassword are required" });
        }


        //find the user
        const user = await User.findById(userId);

        //check the user and password is correct or not.
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(403).json({ error: "Invalid Password" });
        }

        //update the password
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated' });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;