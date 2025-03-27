const express = require('express');
const multer = require('multer');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(), // Use memory storage for simplicity
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

router.post(
  '/create',
  authMiddleware,
  upload.single('profilePhoto'),
  profileController.createProfile
);
// Other routes remain the same
router.get('/my-profile', authMiddleware, profileController.getMyProfile);
router.put('/update/:userId', authMiddleware, profileController.updateProfile);
router.delete('/delete/:userId', authMiddleware, profileController.deleteProfile);
router.get('/', authMiddleware, profileController.getAllProfiles);

module.exports = router;