const Work = require('../models/Work'); 
const Profile = require('../models/Profile'); 


// Add Work Controller
exports.addWork = async (req, res) => {
    try {
        const { profileId, category, description, basic, standard, premium, skills, sample,contact } = req.body;

        // Validate profileId
        if (!profileId) {
            return res.status(400).json({ error: 'Profile ID is required' });
        }

        // Create a new work document
        const newWork = new Work({
            profileId, // Link work to a profile
            category,
            description,
            basic,
            standard,
            premium,
            skills,
            sample,
            contact
        });

        // Save work to the database
        const savedWork = await newWork.save();

        // Send a success response
        res.status(201).json({
            message: 'Work posted successfully!',
            work: savedWork,
        });
    } catch (error) {
        console.error('Error adding work:', error.message);
        res.status(500).json({
            error: 'Failed to post work. Please try again later.',
        });
    }
};
exports.getWorksForProfile = async (req, res) => {
    try {
      const { profileId } = req.params;
  
      const works = await Work.find({ profileId });
      if (!works || works.length === 0) {
        return res.status(200).json({ message: 'No works found for this profile' });
      }
  
      res.status(200).json(works);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching works', error });
    }
  };
  exports.updateWork = async (req, res) => {
    try {
      const { workId, category, description, fileUrl } = req.body;
  
      const work = await Work.findById(workId);
      if (!work) {
        return res.status(404).json({ message: 'Work not found' });
      }
  
      work.title = title || work.title;
      work.description = description || work.description;
      work.fileUrl = fileUrl || work.fileUrl;
  
      await work.save();
      res.status(200).json({ message: 'Work updated successfully', work });
    } catch (error) {
      res.status(500).json({ message: 'Error updating work', error });
    }
  };
  exports.deleteWork = async (req, res) => {
    try {
      const { profileId, workId } = req.body;
  
      // Remove the work from the database
      const work = await Work.findByIdAndDelete(workId);
      if (!work) {
        return res.status(404).json({ message: 'Work not found' });
      }
  
      // Remove the work ID from the profile's workIds array
      await Profile.findByIdAndUpdate(profileId, {
        $pull: { workIds: workId },
      });
  
      res.status(200).json({ message: 'Work deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting work', error });
    }
  };
