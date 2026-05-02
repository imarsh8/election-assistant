const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || ''
        });

        const dbName = process.env.DB_NAME || 'election_assistant';

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        await connection.query(`USE \`${dbName}\`;`);

        // Create Users Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                location VARCHAR(255)
            );
        `);

        // Create Chats Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Chats (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                message TEXT NOT NULL,
                response TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
            );
        `);

        // Create Candidates Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Candidates (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                party VARCHAR(255) NOT NULL,
                education VARCHAR(255),
                experience TEXT,
                manifesto TEXT
            );
        `);

        // Create FAQs Table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS FAQs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                question TEXT NOT NULL,
                answer TEXT NOT NULL
            );
        `);

        // Insert mock data if empty
        const [candidates] = await connection.query(`SELECT COUNT(*) as count FROM Candidates`);
        if (candidates[0].count === 0) {
            await connection.query(`
                INSERT INTO Candidates (name, party, education, experience, manifesto) VALUES 
                ('Candidate A', 'Party X', 'Masters in Economics', '10 years in public service', 'Focus on education and healthcare.'),
                ('Candidate B', 'Party Y', 'Law Degree', '5 years as mayor', 'Focus on infrastructure and job creation.')
            `);
        }

        const [faqs] = await connection.query(`SELECT COUNT(*) as count FROM FAQs`);
        if (faqs[0].count === 0) {
            await connection.query(`
                INSERT INTO FAQs (question, answer) VALUES 
                ('What are the required documents to vote in India?', 'You need an EPIC (Voter ID) card. Alternatively, you can use Aadhaar Card, PAN Card, Driving License, Indian Passport, or a Passbook issued by a Bank/Post Office.'),
                ('What is the minimum age to vote in India?', 'You must be at least 18 years old on the qualifying date (usually January 1st of the year of revision of electoral roll).'),
                ('Can an NRI vote?', 'Yes, an NRI can vote, but they must be physically present at their respective polling booth in India to cast their vote.')
            `);
        }

        console.log('Database and tables initialized successfully.');
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initDB();
