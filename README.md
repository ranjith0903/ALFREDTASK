# LeitnerLearn

LeitnerLearn is a **flashcard-based learning app** implementing the **Leitner System** using spaced repitition logic. This app helps users review and retain information efficiently by organizing flashcards into different review levels.

---

##  Features

- **User Authentication** (Signup, Login, Logout)\
-Flashcard Creation & Management (CRUD operations)\
- **Leitner System Integration** (Spaced repetition logic)\
-Due Flashcards (Only fetches cards that need review today)\
- **Dark Mode Toggle** (Persistent via localStorage)\
-Progress Tracking (Displays how many flashcards are due today)\
- **Framer Motion Animations** (Smooth transitions & UI effects)\
-Mobile Responsive UI (Tailwind CSS )

---

## 🛠 Tech Stack

**Frontend:** React, React Hooks, Zustand, Axios, TailwindCSS,  Framer Motion\
**Backend:** Node.js, Express, Mongoose, MongoDB Atlas\
**Authentication:** JWT Authentication

---

## 📜 Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/LeitnerLearn.git
cd LeitnerLearn
```

### 2️⃣ Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the backend folder and add:

```env
PORT=8000
MONGO_URI=mongodb+srv://your-mongodb-url
ACCESS_TOKEN_SECRET=your-secret-key
REFRESH_TOKEN_SECRET
```

### 4️⃣ Run the Backend Server

```sh
cd backend
npm run dev
```

### 5️⃣ Run the Frontend

```sh
cd frontend
npm run dev
```

---

## 🎯 Thought Process & Implementation

### 🔧 Backend Implementation

- **Express + Mongoose + MongoDB Atlas** for efficient object modeling.
- **JWT authorization**
- **Leitner System Logic**:
-Receives User Response

-The API takes an id (flashcard ID) and correct (boolean) from the request body.
correct: true → Answered correctly.
correct: false → Answered incorrectly.
Fetches the Flashcard from the Database

-Uses Mongoose to find the flashcard by _id and userId.
If the flashcard is not found, returns a 404 Not Found response.
Implements Leitner System Logic

-If answered correctly, the flashcard moves to the next box (up to Box 5).
 If answered incorrectly, the flashcard resets to Box 1.
 Calculates nextReview Date Based on Box Level

-Spaced repetition intervals are used:
 Box 1 → Review in 1 day
 Box 2 → Review in 2 days
 Box 3 → Review in 4 days
 Box 4 → Review in 7 days
 Box 5 → Review in 14 days
Saves the Updated Flashcard to the Database

-The updated flashcard with the new box level and nextReview date is saved.

-*Fetching due cards thought process*

  -The backend extracts the user ID from the request.
  
 -The database is queried using $lte (less than or equal to) to fetch all flashcards where nextReview date is today or earlier.

 -The server returns the due flashcards to the frontend.

 -If no flashcards are due, an empty array is sent, and the frontend displays "No cards to review today."

- **Due Flashcards API:** Fetches only the flashcards scheduled for today’s review.

Frontend Implementation

- Zustand for state management(lightweight & efficient).
- Framer Motion animations for smooth flashcard transitions.
- Tinder-like UI but with buttons instead of swipes for reviewing.
- Dark Mode Toggle persists across sessions using localStorage.
- Responsive Design for mobile and desktop.










