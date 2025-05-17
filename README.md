# Event Booking System

A modern, full-stack web application for discovering, creating, and booking events.
 Built with React, Node.js, Express, and MongoDB. (MERN Stack). The web application has been deployed using Render for the backend and Vercel for the frontend.

 Link for the web app: https://event-booking-system-noureldin.vercel.app/
 Admin sample credentials:
 email: admin@admin.com
 password: admin

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
* **Deployment** on Render and Vercel (Link above)

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
# I put an example for the .env below
npm start or npm run dev if you want to use nodemon
```

### 3\. Setup the Frontend

```bash
cd frontend
npm install
# I also put an example for its .env below
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

 * **Landing Page**:

![Screenshot 2025-05-17 173206](https://github.com/user-attachments/assets/dfbb1e88-5575-4b66-a2c5-70c4f55c42e7)


 * **Admin**:

![Screenshot 2025-05-17 173724](https://github.com/user-attachments/assets/754370ec-9143-4cff-bafa-41c0d0f7badc)

![Screenshot 2025-05-17 173624](https://github.com/user-attachments/assets/7dd63e65-5d19-467a-9dcf-ae3c17bc57b0)

![Screenshot 2025-05-17 173700](https://github.com/user-attachments/assets/d63e4358-7786-4169-aaa6-5a7d035e0756)







  * **User**:


    
![Screenshot 2025-05-17 173252](https://github.com/user-attachments/assets/8f26eb07-2fae-45c7-ad75-0ba2ff75eace)


![Screenshot 2025-05-17 173431](https://github.com/user-attachments/assets/a1153995-f839-4efd-9058-0448407e6dbe)


![Screenshot 2025-05-17 173515](https://github.com/user-attachments/assets/83fb0b76-e2be-4e13-a940-eeac5cc6b72a)


![Screenshot 2025-05-17 173530](https://github.com/user-attachments/assets/47a92e6d-b572-4e7b-beb5-b2354e67b0f1)


  * **Footer**:

![Screenshot 2025-05-17 192143](https://github.com/user-attachments/assets/1d3913e9-4460-44c7-856a-ef914e9b8d4c)


## 📧 Contact

Email me at noureldinmahgoub@gmail.com

```
```
