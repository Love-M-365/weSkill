const Profile = require('../models/Profile');


const path = require('path');
exports.createProfile = async (req, res) => {
    try {
      console.log('Raw request body:', req.body);
  
      // PROVEN SOLUTION: Handle array fields properly
      const getArrayField = (fieldName) => {
        if (Array.isArray(req.body[fieldName])) {
          return req.body[fieldName];
        }
        if (req.body[fieldName]) {
          return [req.body[fieldName]];
        }
        return [];
      };
  
      const profileData = {
        userId: req.body.userId,
        fullName: req.body.fullName,
        typeOfWork: req.body.typeOfWork,
        primarySkill: req.body.primarySkill,
        additionalSkills: getArrayField('additionalSkills'),
        highestQualification: req.body.highestQualification,
        fieldOfStudy: req.body.fieldOfStudy,
        preferredWorkLocation: req.body.preferredWorkLocation,
        links: req.body.links,
        bio: req.body.bio,
        profilePhoto: req.file ? req.file.path : null
      };
  
      // Validate required fields
      const requiredFields = ['userId', 'fullName', 'typeOfWork', 'primarySkill', 'highestQualification', 'fieldOfStudy', 'bio'];
      const missingFields = requiredFields.filter(field => !profileData[field] || (Array.isArray(profileData[field]) && profileData[field].length === 0));
  
      if (missingFields.length > 0) {
        return res.status(400).json({
          message: 'Missing required fields',
          missingFields,
          receivedData: profileData
        });
      }
  
      // Create and save profile
      const profile = await Profile.create(profileData);
      res.status(201).json({ 
        success: true,
        message: 'Profile created successfully',
        profile
      });
  
    } catch (error) {
      console.error('Profile creation error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
// Update an existing profile
exports.updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.status(200).json({ message: 'Profile updated successfully.', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile.', error });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const profile = await Profile.findOneAndDelete({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }

    res.status(200).json({ message: 'Profile deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete profile.', error });
  }
};

// Get all profiles (optional, for admin or list purposes)
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve profiles.', error });
  }
};
// controllers/profileController.js
exports.getMyProfile = async (req, res) => {
    try {
      const profile = await Profile.findOne({ userId: req.user.id })
        .select('fullName typeOfWork primarySkill highestQualification fieldOfStudy preferredWorkLocation bio links profilePhoto')
        .lean();
  
      if (!profile) {
        return res.status(404).json({ 
          success: false,
          message: 'Profile not found' 
        });
      }
  
      res.status(200).json({
        success: true,
        profile
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
      });
    }
  };