const express = require("express");
const cros = require("cors");
const authenticateToken = require("./authMiddleware")

const app = express();
app.use(cros());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Protected route (requires valid Firebase token)
app.get("/api/profile", authenticateToken, (req, res) => {
  res.json({
    uid: req.user.uid,
    email: req.user.email,
    message: "This is protected data."
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));