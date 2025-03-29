const express = require('express');
const { placeOrder } = require("../controllers/placeOrderController");
const {
  signupUser,
  loginUser
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post("/place-order", placeOrder);



module.exports = router;
