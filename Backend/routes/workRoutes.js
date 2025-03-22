const express = require('express');
const {
    addWork, 
    getWorksForProfile, 
    updateWork, 
    deleteWork
} = require('../controllers/workController'); // Ensure this path is correct

const router = express.Router();

// Routes
router.post('/add', addWork); // Check if 'addWork' is correctly imported
router.get('/:profileId', getWorksForProfile);
router.put('/update', updateWork);
router.delete('/delete', deleteWork);

module.exports = router;
