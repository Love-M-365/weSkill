const express = require("express");
const axios = require("axios"); 
const Comment = require("../models/Comment");
const Profile = require("../models/Profile");

const router = express.Router();

// Add a comment and analyze sentiment
router.post("/add", async (req, res) => {
  try {
    const { profileId, text } = req.body;

    // Save the comment
    const comment = new Comment({ profileId, text });
    await comment.save();

    // Send comment to AI model
    const aiResponse = await axios.post("http://localhost:5001/analyze", { text });

    const { sentiment, badges } = aiResponse.data;

    // Update profile with new badges
    const profile = await Profile.findById(profileId);
    if (!profile) return res.status(404).json({ error: "Profile not found" });

    profile.badges = [...new Set([...profile.badges, ...badges])]; // Add unique badges
    await profile.save();

    res.json({ message: "Comment processed", sentiment, badges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get('/comments/:profileId', async (req, res) => {
    const profileId = req.params.profileId;
    try {
        const comments = await Comment.find({ profileId }); 
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
