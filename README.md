# PixForge AI

PixForge AI is a full-stack web application that generates images from text prompts using AI. The application provides secure authentication, a credit-based usage system, online payment integration, and cloud storage for generated images.

## Features

- AI-powered text-to-image generation
- Secure user authentication with JWT
- Credit-based image generation system
- Online payment integration for purchasing credits
- Cloudinary integration for image storage
- Responsive user interface
- Protected backend APIs
- Download generated images

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Services
- OpenAI API
- Cloudinary
- Razorpay *(or Stripe, depending on your implementation)*

---

## Project Structure

```
PixForge-AI
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/Shubhamkr0605/PixForge.git
cd PixForge
```

### Backend

```bash
cd server
npm install
```

Create a `.env` file in the server directory.

```env
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_API_KEY
CLOUDINARY_API_SECRET=YOUR_API_SECRET
RAZORPAY_KEY_ID=YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
```

Start the backend server.

```bash
npm run server
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## How It Works

1. Users register or log in.
2. Free credits are assigned to new users.
3. Users enter a text prompt to generate an image.
4. Credits are deducted after each successful generation.
5. Users can purchase additional credits through the payment gateway.
6. Generated images are stored in Cloudinary and can be downloaded.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT authentication |
| `OPENAI_API_KEY` | OpenAI API key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |

---

## Future Improvements

- Image generation history
- Multiple AI model support
- Image editing tools
- Prompt templates
- User profile management
- Admin dashboard

---

## Author

**Shubham Srivastava**

- GitHub: https://github.com/Shubhamkr0605
- LinkedIn: https://www.linkedin.com/in/shubhamkr0605

## License

This project is licensed under the MIT License.
