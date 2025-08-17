# 🔗 URL Shortener with User Authentication

A full-stack URL shortening service built with Node.js, Express, MongoDB, and Mongoose. Features user authentication, URL management, and analytics tracking.

## ✨ Features

- **🔐 User Authentication**: Secure signup, login, and logout functionality
- **🔗 URL Shortening**: Create short, memorable URLs from long links
- **📊 Analytics**: Track visit history and click statistics for each shortened URL
- **🛡️ Protected Routes**: Authentication middleware for secure access
- **🎨 Server-Side Rendering**: EJS templates for dynamic web pages
- **📱 Responsive Design**: Modern UI with Tailwind CSS
- **🗄️ MongoDB Integration**: Robust data persistence with Mongoose ODM

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Session-based with cookie parsing
- **Frontend**: EJS templating engine
- **Styling**: Tailwind CSS
- **Development**: Nodemon for auto-reload

## 📋 Prerequisites

Before running this project, make sure you have:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) installed and running
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/UdayIge/Trunckify.git
   cd Trunckify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   SESSION_SECRET=your-secret-key-here
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

5. **Run the application**
   ```bash
   npm start
   ```

The server will start at `http://localhost:3000`

## 🏗️ Project Structure

```
06-mongodb/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── db/              # Database connection
├── middlewares/     # Authentication middleware
├── model/           # Mongoose models
├── routes/          # Express routes
├── services/        # Business logic services
├── views/           # EJS templates
├── index.js         # Main server file
└── package.json     # Dependencies and scripts
```

## 📚 API Endpoints

### Authentication Routes
- `POST /user` - User registration
- `POST /user/login` - User login
- `POST /user/logout` - User logout

### URL Management Routes
- `POST /url` - Create shortened URL
- `GET /url/:shortId` - Redirect to original URL
- `GET /url/show/all` - Get all URLs for authenticated user
- `DELETE /url/:shortId` - Delete a shortened URL

### Static Routes
- `GET /` - Home page (requires authentication)
- `GET /login` - Login page
- `GET /signup` - Registration page

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  timestamps: true
}
```

### URL Model
```javascript
{
  originalUrl: String (required),
  shortId: String (required, unique),
  visitedHistory: [{
    visitedTime: Date
  }],
  createdBy: ObjectId (ref: "user"),
  timestamps: true
}
```

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with name, email, and password
2. **Login**: Users authenticate with email and password
3. **Session Management**: Authentication state maintained via cookies
4. **Protected Routes**: Middleware ensures only authenticated users access certain endpoints
5. **Logout**: Users can securely log out, clearing their session

## 🎨 Frontend Features

- **Responsive Design**: Mobile-friendly interface
- **Dynamic Content**: Server-side rendered pages with EJS
- **User Dashboard**: Manage and view all shortened URLs
- **Analytics Display**: Visual representation of URL performance
- **Modern UI**: Clean, intuitive user interface

<img width="1360" height="762" alt="Hero" src="https://github.com/user-attachments/assets/9f5463f8-ba93-417a-b990-210a916783de" />

## 🚀 Development

### Running in Development Mode
```bash
npm start
```
This uses nodemon for automatic server restart on file changes.

### Environment Variables
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `SESSION_SECRET`: Secret key for session encryption

## 📦 Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling tool
- **ejs**: Embedded JavaScript templating
- **cookie-parser**: Parse Cookie header
- **dotenv**: Load environment variables
- **nanoid**: Generate unique IDs for shortened URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Express.js and MongoDB
- Icons from [Font Awesome](https://fontawesome.com/) icon libraries

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**Happy Coding! 🚀**


