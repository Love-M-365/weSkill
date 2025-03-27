const bcrypt = require('bcryptjs');

const verifyHash = async () => {
  const providedPassword = "sanjeev1975"; // Replace with your test password
  const hashedPassword = "$2b$10$bJUSQUkkM/wC.MOvgIvFhuLkWVVaH5YUXbytp01pQ6PDsAI2Tc9OK"; // Replace with your hash from the DB

  console.log("Provided password:", providedPassword);
  console.log("Hashed password from database:", hashedPassword);

  try {
    const isMatch = await bcrypt.compare(providedPassword, hashedPassword);
    console.log("Password matches:", isMatch ? "YES" : "NO");
  } catch (error) {
    console.error("Error during bcrypt.compare:", error.message);
  }
};

verifyHash();
