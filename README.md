# Election Assistant Pro

A full-stack AI-powered web application designed to act as a smart, unbiased election assistant. It helps users understand elections, candidates, voting processes, and evaluate fake news using the Grok API (xAI).

## Features
- **AI Chatbot**: Context-aware, neutral, and unbiased chat powered by Grok API.
- **Candidate Comparison**: Impartial comparison of candidates' education, experience, and manifestos.
- **Fake News Check**: Prompt-based classification to verify election-related claims.
- **Eligibility Checker**: Simple tool to check voting eligibility.
- **Voting Guide**: Step-by-step instructions and FAQs.
- **Authentication**: JWT-based secure signup and login.
- **Database**: MySQL to store users, chats, candidates, and FAQs.

## Tech Stack
- **Frontend**: React (Vite), React Router, Lucide Icons
- **Backend**: Node.js, Express, MySQL, JSON Web Tokens (JWT), Axios, OpenAI SDK
- **Deployment**: Docker, Google Cloud Run

## Setup Instructions for Local Development

### 1. Database Setup
1. Ensure MySQL is running locally.
2. The database is initialized automatically if it doesn't exist when you run the backend init script:
   \`\`\`bash
   cd backend
   node init_db.js
   \`\`\`

### 2. Environment Variables
In the \`backend\` folder, modify the \`.env\` file as needed:
\`\`\`env
GROK_API_KEY=your_xai_grok_api_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=election_assistant
JWT_SECRET=supersecretjwtkey
PORT=8080
\`\`\`

### 3. Run Backend
\`\`\`bash
cd backend
npm install
node server.js
\`\`\`
The backend will run on \`http://localhost:8080\`.

### 4. Run Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
The frontend will run on \`http://localhost:5173\`.

---

## Deployment on Google Cloud Run

### 1. Build the Docker Image
A multi-stage Dockerfile is provided in the root directory. It builds the React frontend and serves it from the Node.js Express backend.

Build the image locally (optional):
\`\`\`bash
docker build -t election-assistant-pro .
\`\`\`

### 2. Push to Google Container Registry (GCR) or Artifact Registry
\`\`\`bash
# Configure auth
gcloud auth configure-docker

# Tag image
docker tag election-assistant-pro gcr.io/YOUR_PROJECT_ID/election-assistant-pro

# Push image
docker push gcr.io/YOUR_PROJECT_ID/election-assistant-pro
\`\`\`

### 3. Deploy to Cloud Run
\`\`\`bash
gcloud run deploy election-assistant-pro \\
  --image gcr.io/YOUR_PROJECT_ID/election-assistant-pro \\
  --platform managed \\
  --region us-central1 \\
  --allow-unauthenticated \\
  --port 8080 \\
  --set-env-vars="GROK_API_KEY=your_api_key,DB_HOST=your_cloud_sql_ip,DB_USER=root,DB_PASSWORD=your_db_pass,DB_NAME=election_assistant,JWT_SECRET=prod_secret_key"
\`\`\`

*(Note: For production database on Cloud SQL, ensure the Cloud Run service has the correct service account and VPC Connector/Cloud SQL Auth Proxy set up, or use public IP if configured)*
