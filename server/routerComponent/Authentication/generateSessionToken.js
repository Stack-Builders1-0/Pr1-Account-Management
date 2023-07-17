const jwt = require('jsonwebtoken');

// Function to generate a session token (JWT)
function generateSessionToken(userId) {
  const secretKey = 'secret_key'; // Replace with your own secret key
  const expiresIn = '18h'; // Set the expiration time for the token

  // Create the token payload
  const payload = {userId: userId};

  // Generate the JWT
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
}

module.exports = generateSessionToken;
