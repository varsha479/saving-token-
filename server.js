const express = require("express");
const jwt = require("jsonwebtoken");
const encrypt = require("./script");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const user = req.body; // Example payload: { id: 1, name: "Alice" }

  const token = encrypt(user);
  res.json({ token });
});

app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("No token provided");

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid or expired token");

    res.send(`Hello ${decoded.name}, you accessed protected data!`);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});