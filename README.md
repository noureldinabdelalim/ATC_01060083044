
# Event Booking System

A modern, full-stack web application for discovering, creating, and booking events.
 Built with React, Node.js, Express, and MongoDB. (MERN Stack)

## 🚀 Features

* **User Registration & Login** (with JWT authentication)
* **Dark & Light Mode** 
* **Browse and Filter Events**
* **Book and Cancel Event Tickets**
* **Admin Dashboard** for event and admin management
* **Create, Edit, and Delete Events** (admin only)
* **Responsive Design** 
* **Professional UI** with Material-UI (MUI) and some Bootstrap
* **PDF Booking Confirmation** download
* **Profile Management** for users

## 🛠️ Tech Stack

**Frontend:**

* React 
* Material-UI (MUI)
* Bootstrap
* React Router

**Backend:**

* Node.js
* Express.js
* MongoDB & Mongoose

**Other:**

* JWT Authentication
* Context API for Auth & Dark Mode
* HTML2Canvas & jsPDF (for PDF export)

## 📁 Project Structure

```

EventBookingSystemNoureldin/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── .env
├── .env.example
└── package.json

````

## ⚡ Getting Started

### Prerequisites

* Node.js 
* npm 
* MongoDB 

### 1. Clone the repository

```bash
git clone [https://github.com/yourusername/EventBookingSystemNoureldin.git](https://github.com/yourusername/EventBookingSystemNoureldin.git)
cd EventBookingSystemNoureldin
````

### 2\. Setup the Backend

```bash
cd backend
npm install
# I put an example for it below
npm start
```

### 3\. Setup the Frontend

```bash
cd frontend
npm install
# I also put an example for it below
npm start
```

  * The frontend runs on `http://localhost:3000`
  * The backend runs on `http://localhost:5000` (or as set in your `.env`)

## ⚙️ Environment Variables

**Backend (`.env`):**

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend (`.env`):**

```
REACT_APP_BACKEND_URL=http://localhost:5000 //or if you deployed put the url here
```

## 👥 User Roles

  * **Admin**: Can create, edit, delete events and manage admins.
  * **User**: Can browse, book, and cancel event bookings as well as manage thir profile and see their bookings. I also added the feature of downloading the booking confirmation.

## 📸 Screenshots



## 📧 Contact

Email me at noureldinmahgoub@gmail.com

```
```
