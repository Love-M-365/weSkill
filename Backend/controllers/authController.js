const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration time
  });
};

// @desc    User Signup
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  try {
    const { name, age, phone, gender, email, password, city, country, role } = req.body;

    // Validate required fields
    if (!name || !age || !phone || !gender || !email || !password || !city || !country) {
      return res.status(400).json({ error: 'All fields except role are required.' });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: email.trim().toLowerCase() });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Hash the password
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name: name.trim(),
      age,
      phone: phone.trim(),
      gender: gender.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword, // Save the hashed password
      city: city.trim(),
      country: country.trim(),
      role: role?.trim() || 'provider', // Default to 'provider' if role is not provided
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Send response with user details and JWT token
    res.status(201).json({
      message: 'User created successfully!',
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();
      
      console.log("Login attempt:", {
        email: trimmedEmail,
        password: trimmedPassword,
        passwordLength: trimmedPassword.length
      });

      const user = await User.findOne({ email: trimmedEmail });
      if (!user) {
        console.log("User not found in database");
        return res.status(404).json({ error: "User not found." });
      }

      console.log("User found:", {
        userId: user._id,
        dbPassword: user.password,
        dbPasswordLength: user.password.length,
        dbPasswordType: typeof user.password
      });

      // Manually compare first few characters to verify storage
      console.log("Password hash starts with:", user.password.substring(0, 10));

      const isMatch = await bcrypt.compare(trimmedPassword, user.password);
      console.log("Bcrypt compare result:", isMatch);

      if (!isMatch) {
        // Test with a known good hash to verify bcrypt is working
        const testHash = await bcrypt.hash("test123", 10);
        const testMatch = await bcrypt.compare("test123", testHash);
        console.log("Sanity check - should be true:", testMatch);
        
        return res.status(401).json({ error: "Invalid credentials. Please try again." });
      }

     
      const token = generateToken(user._id);
  
      // Respond with token and user details (excluding password)
      res.status(200).json({
        message: "Login successful!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: error.message });
    }
};
  
module.exports = {
  signupUser,
  loginUser,
};
