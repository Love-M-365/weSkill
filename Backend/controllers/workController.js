const Work = require('../models/Work'); 
const Profile = require('../models/Profile'); 

exports.addWork = async (req, res) => {
    try {
        const { profileId, title, description } = req.body;

        const work = new Work({
            profile: profileId,
            title,
            description
        });

        await work.save();

        // Update the profile to include the new work
        const profile = await Profile.findById(profileId);
        profile.uploadedWorks.push(work._id);
        await profile.save();

        res.status(201).json({ message: 'Work added successfully', work });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWorksForProfile = async (req, res) => {
    try {
      const { profileId } = req.params;
  
      const works = await Work.find({ profileId });
      if (!works || works.length === 0) {
        return res.status(404).json({ message: 'No works found for this profile' });
      }
  
      res.status(200).json(works);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching works', error });
    }
  };
  exports.updateWork = async (req, res) => {
    try {
      const { workId, title, description, fileUrl } = req.body;
  
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
