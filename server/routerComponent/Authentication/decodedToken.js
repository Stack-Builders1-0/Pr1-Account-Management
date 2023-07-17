const jwt = require('jsonwebtoken');

function decodeUserId(token){
    console.log(token);
    // Get the token from the request cookies
    // const token = req.cookies.token; // Replace 'token' with your cookie name
  
    // Verify and decode the token to access the user ID
    const secretKey = 'secret_key';
    try {
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.userId;

    //   console.log(userId);
      return userId;
    } catch (error) {
    //   // Token verification failed
    //   res.status(401).json({ error: 'Invalid token' });
    return false;
    }

    
}

module.exports = decodeUserId;

  