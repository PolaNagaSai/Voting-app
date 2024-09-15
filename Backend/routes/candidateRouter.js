const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Candidate = require('./../models/candidate');
const { generateToken, jwtAuthMiddleware } = require("./../jwt")


const isAdmin = async(userId) => {
    try {
        const user = await User.findById(userId);
        if (user.role === "admin") {
            return true;
        }
    } catch (err) {
        return false;
    }
}

//post method to add candidates
router.post("/", jwtAuthMiddleware, async(req, res) => {
    try {
        if (!(await isAdmin(req.user.id))) {
            return res.status(403).json({ error: "Doesn't have Admin Role" });
        }

        // Assuming the request body contains the candidate data
        const data = req.body;

        const newCandidate = new Candidate(data);

        const response = await newCandidate.save();

        res.status(200).json({ msg: "candidate data saved" });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//update the cadidate data
router.put("/:candidateID", jwtAuthMiddleware, async(req, res) => {
    try {
        if (!(await isAdmin(req.user.id)))
            return res.status(403).json({ message: 'user does not have admin role' });

        const candidateID = req.params.candidateID; // Extract the id from the URL parameter
        const updatedCandidateData = req.body; // Updated data for the person

        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ msg: "candidate data updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//delete the candidate data
router.delete("/:candidateID", jwtAuthMiddleware, async(req, res) => {
    try {
        if (!(await isAdmin(req.user.id)))
            return res.status(403).json({ message: 'user does not have admin role' });

        const candidateID = req.params.candidateID; // Extract the id from the URL parameter

        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ msg: "candidate deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get List of all candidates with only name and party fields
router.get("/", async(req, res) => {
    try {
        // Find all candidates and select only the name and party fields, excluding _id
        const candidates = await Candidate.find({}, 'name party age _id');

        // Return the list of candidates
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//now get ready for voting
router.post("/vote/:candidateId", jwtAuthMiddleware, async(req, res) => {

    const candidateId = req.params.candidateId;
    const userId = req.user.id;
    try {
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        if (user.role == 'admin') {
            return res.status(403).json({ message: 'admin is not allowed' });
        }

        if (user.isVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        //updating the cadidate votes status
        candidate.votes.push({ user: userId })
        candidate.voteCount++;
        await candidate.save();

        //updating the user vote status
        user.isVoted = true;
        await user.save();

        return res.status(200).json({ msg: "vote recorded sucessfully" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// vote count 
router.get("/voteCount", async(req, res) => {
    try {
        // Find all candidates and sort them by voteCount in descending order
        const candidate = await Candidate.find().sort({ voteCount: 'desc' });

        // Map the candidates to only return their name and voteCount
        const voteRecord = candidate.map((data) => {
            return {
                party: data.party,
                count: data.voteCount
            }
        });

        return res.status(200).json(voteRecord);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;