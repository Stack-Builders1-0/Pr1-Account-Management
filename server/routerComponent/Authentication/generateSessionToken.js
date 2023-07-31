const jwt = require("jsonwebtoken");

// Function to generate a session token (JWT)
function generateSessionToken(userId) {
  const secretKey = "secret_key"; // Replace with your own secret key
  const expiresIn = "18h"; // Set the expiration time for the token

  const payload = {
    userId: userId,
    httpOnly: true,
    secure: false, // Enable this in a production environment with HTTPS
    sameSite: "Strict",
    // maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    path: "/", // Specify the path for which the token is valid
  };

  // Generate the JWT
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
}

module.exports = generateSessionToken;
