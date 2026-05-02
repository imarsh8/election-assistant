// ================= IMPORTS =================
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const pool = require('./db');

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// ================= HEALTH CHECK =================
app.get("/debug-version", (req, res) => {
  res.json({
    status: "NEW CODE DEPLOYED SUCCESSFULLY 🚀",
    time: new Date().toISOString()
  });
});

// ================= AUTH APIs =================
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, location } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO Users (name, email, password, location) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, location || null]
    );

    res.json({ message: "User created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      'SELECT * FROM Users WHERE email=?',
      [email]
    );

    if (!users.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
});

// ================= CANDIDATES =================
app.get('/candidates/:state', async (req, res) => {
  try {
    const { state } = req.params;

    const [rows] = await pool.query(
      'SELECT * FROM Candidates WHERE state = ?',
      [state]
    );

    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
});

// ================= ELIGIBILITY =================
app.post('/eligibility', (req, res) => {
  const { age, citizenship } = req.body;

  if (!age || !citizenship) {
    return res.json({ eligible: false, reason: "Missing data" });
  }

  if (citizenship.toLowerCase() !== "indian") {
    return res.json({ eligible: false, reason: "Only Indian citizens allowed" });
  }

  if (age < 18) {
    return res.json({ eligible: false, reason: "Must be 18+" });
  }

  res.json({ eligible: true, reason: "Eligible to vote" });
});

// ================= CHAT =================
app.post('/chat', (req, res) => {
  res.json({
    response: "AI chat working (replace with Gemini/Ollama later)"
  });
});

// ================= FAKE NEWS =================
app.post('/fake-news-check', (req, res) => {
  res.json({
    classification: "Uncertain",
    explanation: "AI analysis placeholder (connect Gemini/Ollama for real results)"
  });
});

// ================= FAQS =================
app.get('/faqs', (req, res) => {
  res.json([
    { id: 1, question: "How to vote?", answer: "Go to polling booth with ID" },
    { id: 2, question: "Age limit?", answer: "18 years minimum" }
  ]);
});

// ================= CHAT HISTORY =================
app.get('/chats', (req, res) => {
  res.json([]);
});

// ================= AI COMPARE =================
app.post('/compare-ai', async (req, res) => {
  try {
    const { candidateIds } = req.body;

    const [candidates] = await pool.query(
      'SELECT * FROM Candidates WHERE id IN (?)',
      [candidateIds]
    );

    const winner = candidates.length ? candidates[0].name : "N/A";

    const analysis = {};
    candidates.forEach(c => {
      analysis[c.name] = {
        strengths: ["Experience", "Public support"],
        weaknesses: ["Limited data available"]
      };
    });

    res.json({
      summary: `Compared ${candidates.length} candidates`,
      winner,
      analysis,
      candidates
    });

  } catch (err) {
    res.status(500).json({ error: "Compare failed" });
  }
});

// ================= FRONTEND SERVE (VERY IMPORTANT) =================

// Serve React build files
app.use(express.static(path.join(__dirname, "public")));

// Catch-all route (must be LAST)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});