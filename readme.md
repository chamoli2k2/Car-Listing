
---

# 🚗 Car Listing Web Application

A **MERN stack** car listing platform where users can create, view, update, and delete car listings. This project also integrates **Cloudinary** for image uploads, allowing users to easily showcase their cars with images.

## 🌐 Live Demo
You can check out the live deployment [here](https://car-listing-ixro.onrender.com).

---

## 📹 Project Video Demo
[![Watch the video](https://img.youtube.com/vi/ttv1CbgmOCg/maxresdefault.jpg)](https://youtu.be/ttv1CbgmOCg)
> Click the image above to watch a quick walkthrough of the project.

---

## 📑 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## 🚀 Features
- User authentication and authorization (JWT).
- Users can create, update, and delete their car listings.
- View all car listings with detailed information.
- Upload car images securely using **Cloudinary**.
- Responsive design for a seamless experience on all devices.

---

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Image Storage**: Cloudinary
- **Deployment**: Render (Backend), Render (Frontend)

---

## 📂 Folder Structure
```
├── client               # Frontend React app
│   ├── src
│   ├── public
│   ├── constants
│   ├── components
│   ├── pages
├── api               # Backend Express app
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   └── app.js
│   └── server.js
│   └── .env             # Environment variables
|
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary Account](https://cloudinary.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/car-listing.git
   cd car-listing
   ```

2. **Set up the backend**
   ```bash
   cd api
   npm install
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   npm start
   ```

---

## 🔧 Environment Variables
Create a `.env` file in the `server` directory with the following:

```env
PORT=6969
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 📄 API Documentation
You can view the full API documentation using **Postman** [here](https://documenter.getpostman.com/view/21366695/2sAY55ay1i).
### Example Endpoints:
- **POST** `/api/user/register` - Register a new user
- **POST** `/api/user/login` - User login
- **GET** `/api/car/get_all_car_user` - Get all cars for the logged-in user
- **POST** `/api/car/create` - Create a new car listing
- **POST** `/api/car/update/:id` - Update car details
- **DELETE** `/api/car/delete/:id` - Delete a car

---



