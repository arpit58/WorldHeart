# 🫀 Heart Disease Prediction System

A modern, full-stack web application for predicting heart disease risk using machine learning. Built with **Node.js**, **Express**, and featuring a premium **dark mode medical dashboard** UI with glassmorphism design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.x-brightgreen.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Features

### 🎨 Modern UI/UX
- **Dark Mode Medical Dashboard** - Professional, hospital-grade design
- **Glassmorphism Effects** - Semi-transparent cards with backdrop blur
- **Gradient Backgrounds** - Smooth bluish-purple to deep violet transitions
- **Animated Heart Icon** - Pulsing animation with gradient stroke
- **Floating Background Shapes** - Subtle animated elements
- **Responsive Design** - Works seamlessly on all devices

### 🔐 User Authentication
- Signup with email, password, name, and role (Patient/Employee)
- Login with JWT token authentication
- Protected routes with authentication middleware
- Role-based access control
- Password hashing with bcryptjs

### 🏥 Healthcare Features
- **Heart Disease Risk Assessment** - ML-powered prediction
- Patient Panel - view patient records and staff
- Employee Panel - access to all patient data and staff list
- Real-time data from backend API
- Interactive Charts with Chart.js
- Voice Announcements with Web Speech API
- Risk classification (Low/Medium/High)
- Detailed prediction results

✅ **Security**
- Password hashing with bcrypt
- JWT token-based authentication
- Protected API endpoints

## 📁 Project Structure

```
heart-disease-app/
│
├── server.js              # Express server & API routes
├── package.json           # Dependencies
├── .env                   # Environment variables
│
└── public/                # Frontend files
    ├── index.html         # Landing page
    ├── login.html         # Login page
    ├── signup.html        # Signup page
    ├── dashboard.html     # Dashboard page
    ├── prediction.html    # Heart disease prediction
    ├── styles.css         # Global styles
    ├── login.js           # Login logic
    ├── signup.js          # Signup logic
    ├── dashboard.js       # Dashboard logic
    └── prediction.js      # Prediction logic
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14.x or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/arpit58/WorldHeart.git
cd WorldHeart
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the server:**
```powershell
npm start
```

Or for development with auto-reload:
```powershell
npm run dev
```

4. **Open in browser:**
```
http://localhost:3000
```

## 🔐 Demo Credentials

### Patient Account
- **Email:** patient@example.com
- **Password:** password123

### Employee Account
- **Email:** employee@example.com
- **Password:** password123

## 🌐 Deployment on Vercel

### Quick Deploy
1. Click the deploy button below or use your Vercel link
2. Connect your GitHub repository
3. Add environment variables in Vercel dashboard:
   - `JWT_SECRET` - Your secure JWT secret key
   - `NODE_ENV` - Set to `production`
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/arpit58/WorldHeart)

### Manual Deployment Steps
1. Fork or clone this repository
2. Import project to Vercel
3. Configure environment variables:
   ```
   JWT_SECRET=your_super_secret_key_here
   NODE_ENV=production
   ```
4. Deploy

### Important Notes for Vercel
- The app is configured for serverless deployment
- Uses `vercel.json` for routing configuration
- API routes are handled through `/api/*`
- Static files served from `/public`

## 📡 API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - User login
- `GET /api/user` - Get current user info (protected)

### Data
- `GET /api/patients` - Get all patients (protected)
- `GET /api/employees` - Get all employees (protected)

### Prediction
- `POST /api/predict` - Heart disease prediction (protected)

## 🎨 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients & animations
- **Vanilla JavaScript** - Logic & API calls
- **LocalStorage** - Client-side token storage

## 🔒 Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 24-hour expiration
- Protected routes with authentication middleware
- CORS enabled for API access
- Input validation on server-side

## 📝 Usage

### 1. Signup
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Fill in name, email, password, and select role
4. Submit to create account

### 2. Login
1. Go to login page
2. Enter email and password
3. On success, redirected to dashboard

### 3. Dashboard
- **Patient Panel:** View patient list and medical staff
- **Employee Panel:** Access all patient records and staff

### 4. Make Prediction
1. From dashboard, click "Make a Prediction" or "Predict for Patient"
2. Fill in patient health parameters
3. Submit to get risk assessment
4. View results with probability and key factors

## 🧪 Testing

Test the API endpoints using PowerShell:

```powershell
# Test signup
Invoke-RestMethod -Uri http://localhost:3000/api/signup -Method Post -Body (@{name='Test User';email='test@example.com';password='test123';role='patient'} | ConvertTo-Json) -ContentType 'application/json'

# Test login
$login = Invoke-RestMethod -Uri http://localhost:3000/api/login -Method Post -Body (@{email='patient@example.com';password='password123'} | ConvertTo-Json) -ContentType 'application/json'

# Test protected endpoint
Invoke-RestMethod -Uri http://localhost:3000/api/patients -Headers @{Authorization="Bearer $($login.token)"}
```

## 🐛 Troubleshooting

### Port already in use
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000

# Kill the process
Stop-Process -Id <PID> -Force
```

### Cannot find module errors
```powershell
# Reinstall dependencies
Remove-Item node_modules -Recurse -Force
npm install
```

## 🔄 Development Workflow

```powershell
# Start development server with auto-reload
npm run dev

# Make changes to files
# Server automatically restarts

# Test in browser
# http://localhost:3000
```

## 📦 Dependencies

```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "body-parser": "^1.20.2",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1"
}
```

## 🚀 Deployment

To deploy to production:

1. Update `.env` with production values
2. Change `NODE_ENV=production`
3. Use a process manager like PM2
4. Set up reverse proxy (nginx)
5. Use HTTPS in production

## 📄 License

MIT License

## 👨‍💻 Author

Heart Disease Prediction System
