# DomainGenius AI

An intelligent domain name generator powered by AI. Find the perfect .com domain with style-based generation (Brandable, Evocative, etc.) and instant availabi
lity checks.

<img width="941" height="693" alt="Screenshot 2025-12-27 at 12 51 21 PM" src="https://github.com/user-attachments/assets/86c22d9f-3b99-4080-8a29-e0ada816209e" />

<img width="942" height="697" alt="Screenshot 2025-12-27 at 12 52 59 PM" src="https://github.com/user-attachments/assets/c94f6ee3-1830-4ab9-a3c5-b4128d9ede55" />



## Local Installation Guide

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher) installed.
- A [Google Gemini API Key](https://aistudio.google.com/).

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manoob101/domaingenius-ai.git
cd domaingenius-ai
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory of the project and add your Gemini API Key. This key is required for the AI generation to work.

```bash
API_KEY=your_gemini_api_key_here
```

### Step 4: Run the Application

Start the local development server:

```bash
npm start
```

The application should now be running at `http://localhost:1234` (or the port displayed in your terminal).

## Features

- **AI Generation:** Generates 100 creative domain names using Gemini 3 Flash.
- **Style Selection:** Filter by Brandable, Real Words, Compound, Short Phrase, and more.
- **Availability Check:** Checks real-time DNS availability for .com domains.
- **Responsive Design:** Built with Tailwind CSS for a seamless mobile and desktop experience.

## Technologies

- React 19
- TypeScript
- Tailwind CSS
- Google Gen AI SDK
- Lucide React Icons

---
**Made by Manu**
