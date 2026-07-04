# AI Interview & Resume Analyzer

Welcome to the AI Interview & Resume Analyzer! This full-stack web application parses your resume against a target job description and uses AI to generate personalized technical/behavioral interview questions, a skill gap analysis, and a preparation roadmap.

## 🚀 Live Demo

This project is hosted on Render using their free tier. Because of this, the backend server spins down after a period of inactivity. 

**IMPORTANT INSTRUCTIONS FOR VIEWING THE DEMO:**
To view the site, you must "wake up" the backend server first, otherwise the frontend will not be able to log you in or generate reports.

1. **First, wake up the backend:** 
   Click the link below and wait until the page loads (it may take up to 1 minute for the server to spin up). 
   👉 [**Wake up Backend Server**](https://interview-and-resumeanalyser.onrender.com/) 
   *(Note: It is completely normal if it just says "Cannot GET /" or gives a basic JSON response—this means the server is awake!)*

2. **Then, visit the frontend:**
   Once the backend is awake, you can now visit the fully functional frontend and use the app:
   👉 [**Open the Frontend App**](https://interview-and-resumeanalyser-2.onrender.com/)

---

## 💻 Tech Stack
- **Frontend:** React.js, Vite, SCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB & Mongoose
- **AI Integration:** Google Gemini AI
- **Authentication:** JWT & bcrypt
