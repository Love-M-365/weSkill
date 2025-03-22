const Profile = require('../models/Profile');
exports.createProfile = async (req, res) => {
  const { bio, skills, experience, profilePicture } = req.body;
  try {
    const profile = new Profile({
      userId: req.user.id,
      bio,
      skills,
      experience,
      profilePicture,
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
