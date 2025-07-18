// authMiddleware.js

const admin = require("./firebaseAdmin"); // Import your Firebase Admin instance

async function authenticateToken(req, res, next) {
  // Get Authorization header
  const authHeader = req.headers.authorization;

  // Check if header is missing or malformed
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  // Extract the token from "Bearer <token>"
  const idToken = authHeader.split("Bearer ")[1];

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach decoded token info (uid, email, etc.) to request object
    req.user = decodedToken;

    // Continue to next middleware/route handler
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
}

module.exports = authenticateToken;
