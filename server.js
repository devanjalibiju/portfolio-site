// server.js

// 1️⃣ Import required packages
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// 2️⃣ Create Express app
const app = express();
const PORT = 5000;

// 3️⃣ Middleware
app.use(cors()); // allow frontend to talk to backend
app.use(express.json()); // parse JSON requests

// 4️⃣ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",             // your MySQL username
  password: "Dechu@123",// replace with your MySQL password
  database: "portfolio_db"  // make sure this DB exists
});

// 5️⃣ Test database connection
db.connect(err => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// 6️⃣ Handle POST requests from contact form
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Insert data into MySQL
  const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.log("MySQL error:", err);
      return res.status(500).json({ message: "Database error!" });
    }

    // ✅ Send JSON response
    res.json({ message: "Message sent successfully!" });
  });
});

// 7️⃣ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});