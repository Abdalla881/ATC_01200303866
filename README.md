# Booking System

A full-stack booking system application that allows users to browse and book events. The project is divided into two main parts: **Frontend** and **Backend**. Each part has its own detailed README.md file for more information.

---

## Table of Contents

- Features
- Technologies Used
- Project Structure
- Setup Instructions
- Frontend
- Backend
- Demo
- License

---

## Features

- **Event Management**: Browse, filter, and book events by category, location, and more.
- **User Authentication**: Secure login and registration system.
- **Dynamic Filtering**: Filter events by category name or other attributes.
- **Image Uploads**: Upload and manage event images.
- **Responsive Design**: Fully responsive frontend for all devices.
- **Admin Panel**: Manage events, categories, and users.

---

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling.
- **React Router**: For navigation.
- **Axios**: For API requests.

### Backend:
- **Node.js**: For server-side logic.
- **Express.js**: For building the RESTful API.
- **MongoDB**: For the database.
- **Mongoose**: For database modeling.
- **Cloudinary**: For image uploads.
- **Vercel**: For deployment.

---

## Project Structure

```
Booking System/
│
├── frontend/               # Frontend code
│   ├── src/                # React components and logic
│   ├── public/             # Static assets
│   └── README.md           # Frontend-specific details
│
├── backend/                # Backend code
│   ├── Controllers/        # API controllers
│   ├── Middleware/         # Middleware functions
│   ├── Models/             # Mongoose models
│   ├── Routes/             # API routes
│   ├── Utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── README.md           # Backend-specific details
│
├── README.md               # Main project documentation
└── vercel.json             # Vercel deployment configuration
```

---

## Setup Instructions

### Prerequisites:
- **Node.js**: Install [Node.js](https://nodejs.org/).
- **MongoDB**: Set up a MongoDB database (local or cloud).
- **Vercel CLI**: Install [Vercel CLI](https://vercel.com/cli).

### Steps:

1. **Clone the Repository**:
   ```bash
   git clone  https://github.com/Abdalla881/ATC_01200303866.git
   cd booking-system
   ```

2. **Frontend Setup**:
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```
   - For more details, refer to the README.md file in the `frontend` folder.

3. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and configure the following:
     ```
     PORT=5000
     MONGO_URI=your-mongodb-connection-string
     CLOUDINARY_NAME=your-cloudinary-name
     CLOUDINARY_API_KEY=your-cloudinary-api-key
     CLOUDINARY_API_SECRET=your-cloudinary-api-secret
     ```
   - Start the server:
     ```bash
     npm start
     ```
   - For more details, refer to the `README.md` file in the `backend` folder.

4. **Deployment**:
   - Use Vercel to deploy both the frontend and backend. Ensure the `vercel.json` file is correctly configured.

---

## Frontend

The frontend is built using React.js and styled with Tailwind CSS. It provides a user-friendly interface for browsing and booking events.

For more details, refer to the `README.md` file in the `frontend` folder.

---

## Backend

The backend is built using Node.js and Express.js. It provides a RESTful API for managing events, categories, and users. It also handles image uploads using Cloudinary.

For more details, refer to the `README.md` file in the `backend` folder.

---

## Demo

You can view the live demo of the application here:  
[https://egy-events-frontend.vercel.app/](https://egy-events-frontend.vercel.app/)

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Let me know if you need further customization!   - For more details, refer to the `README.md` file in the `backend` folder.

4. **Deployment**:
   - Use Vercel to deploy both the frontend and backend. Ensure the `vercel.json` file is correctly configured.

---

## Frontend

The frontend is built using React.js and styled with Tailwind CSS. It provides a user-friendly interface for browsing and booking events.

For more details, refer to the `README.md` file in the `frontend` folder.

---

## Backend

The backend is built using Node.js and Express.js. It provides a RESTful API for managing events, categories, and users. It also handles image uploads using Cloudinary.

For more details, refer to the `README.md` file in the `backend` folder.

---

## Demo

You can view the live demo of the application here:  
[https://egy-events-frontend.vercel.app/](https://egy-events-frontend.vercel.app/)

---

## License

This project is licensed under the [MIT License](LICENSE).

---
