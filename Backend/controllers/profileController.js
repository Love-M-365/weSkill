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
        upiID: req.body.upiID,
        profilePhoto: req.file ? req.file.path : null,
        badges: req.body.badges
      };
  
      // Validate required fields
      const requiredFields = ['userId', 'fullName', 'typeOfWork', 'primarySkill', 'highestQualification', 'fieldOfStudy', 'bio','upiID'];
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


exports.getMyProfile = async (req, res) => {
    try {
      const profile = await Profile.findOne({ userId: req.user.id })
        .select('fullName typeOfWork primarySkill highestQualification fieldOfStudy additionalSkills preferredWorkLocation bio upiID links profilePhoto badges orders')
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

exports.checkProfile = async (req, res) => {
    try {
        const { profileId } = req.query; // Pass the profile ID as a query parameter
        if (!profileId) {
            return res.status(400).json({ error: 'Profile ID is required' });
        }

        // Check if the profile exists
        const profile = await Profile.findOne({ profileId });
        if (profile) {
            return res.status(200).json({ exists: true, profile });
        } else {
            return res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking profile:', error.message);
        res.status(500).json({ error: 'Failed to check profile.' });
    }
};
exports.filterProfiles = async (req, res) => {
    try {
        const { category, filters } = req.body;
        console.log("Received Category:", category);
        console.log("Received Filters:", filters);

        
        const categoryName = typeof category === "string" ? category : "Web Development";


        // Base query: filter by category
        const query = { additionalSkills: { $in: [categoryName] } };

        // Apply filters only if they exist
        if (filters && Object.keys(filters).length > 0) {
            query.$and = [];

            if (filters.primarySkills) {
                query.$and.push({ primarySkill: { $in: filters.primarySkills } });
            }
            if (filters.rating) {
                query.$and.push({ rating: { $gte: filters.rating } });
            }
            if (filters.badges) {
                query.$and.push({ badges: { $in: filters.badges } });
            }

            // Remove $and if empty
            if (query.$and.length === 0) {
                delete query.$and;
            }
        }

        console.log("MongoDB Query:", JSON.stringify(query, null, 2));

        // Fetch profiles
        const profiles = await Profile.find(query);
        if (!profiles.length) {
            return res.status(200).json([]); // Instead of 404, return empty array
        }

        res.status(200).json(profiles);
    } catch (error) {
        console.error("Error in filterProfiles Controller:", error.message);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


exports.getProfileById = async (req, res) => {
    const { id } = req.params; 
  
    try {
        const profile = await Profile.findById(id);
        
      // Check if profile exists
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      // Return profile if found
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Server error, please try again later' });
    }
  };