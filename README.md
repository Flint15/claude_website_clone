# Claude Clone
*Inspired by [Claude](https://claude.ai/new)*

A front-end clone of the Claude AI. Project replicate the visual design and basic functionality of Claude's chat interface.

## Features

- **Chat Interface**
- **Chat Managment:**
  * Create new chats
  * Rename existing chats
  * Delete chats
  * Chats history

- **Persistent Storage:**
  All chats saved to localStorage
- **Responsive Sidebar**
- **URL-Based Navigation:** Each chat has a unique URL with chat ID parameter
- **Modern UI Components:**
  * Dropdown menus for chat settings
  * Overlay for chat renaming

## Technologies

### Frontend

- HTML
- CSS
- TypeScript
- localStorage

### Backend

- Python
- Flask
- python-dotenv

## Getting started

### Prerequisites

* Node.js and npm (for TypeScript compilation)
* Python ≥ 3.9

### Installation

1. Clone or download the repo
2. **Frontend Setup**

  Install Node.js dependecies:

  `npm install`

3. **Backend Setup**

  Navigate to backend folder:

  `cd backend`
  
  Create virtual environment:
  
  `python -m venv venv`

  Activate virtual environment:

  `venv\Scripts\activate`

  Install Python dependencies:
  
  `pip install -r requirements.txt`

4. **Configure API key**

  Add your Anthropic API key to `backend/.env`:

  `ANTHROPIC_API_KEY=your_key_here`

### Run the project

1. **Start the backend (currently useless :) )**
2. **Start the frontend** (in another terminal):

  Compile TypeScript:

  `npm run build`

  Then open `new.html` in your browser