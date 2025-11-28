const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory database (for demo purposes)
let users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'patient@example.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'patient'
    },
    {
        id: 2,
        name: 'Dr. Smith',
        email: 'employee@example.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'employee'
    }
];

let patients = [
    { id: 1, name: 'John Doe', age: 45, diagnosis: 'Low Risk' },
    { id: 2, name: 'Jane Smith', age: 52, diagnosis: 'High Risk' },
    { id: 3, name: 'Bob Johnson', age: 38, diagnosis: 'Low Risk' }
];

let employees = [
    { id: 1, name: 'Dr. Smith', department: 'Cardiology' },
    { id: 2, name: 'Dr. Williams', department: 'Internal Medicine' },
    { id: 3, name: 'Nurse Sarah', department: 'Emergency' }
];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Signup
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validation
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (role !== 'patient' && role !== 'employee') {
            return res.status(400).json({ error: 'Role must be either "patient" or "employee".' });
        }

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            role
        };

        users.push(newUser);

        res.status(201).json({
            message: 'Signup successful!',
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Find user
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Get current user info
app.get('/api/user', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });
});

// Get all patients
app.get('/api/patients', authenticateToken, (req, res) => {
    res.json(patients);
});

// Get all employees
app.get('/api/employees', authenticateToken, (req, res) => {
    res.json(employees);
});

// Heart disease prediction endpoint
app.post('/api/predict', authenticateToken, (req, res) => {
    try {
        const { age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal } = req.body;

        // Simple prediction logic (mock - replace with actual ML model)
        // For demo: if age > 50 and chol > 240, high risk
        let prediction = 'Low Risk';
        let probability = 30;

        if (age > 50 && chol > 240) {
            prediction = 'High Risk';
            probability = 75;
        } else if (age > 45 || chol > 200) {
            prediction = 'Medium Risk';
            probability = 50;
        }

        res.json({
            prediction,
            probability,
            message: `Based on the provided data, the patient has ${prediction.toLowerCase()} of heart disease.`,
            factors: {
                age,
                cholesterol: chol,
                bloodPressure: trestbps
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Prediction failed.' });
    }
});

// Start server
if (require.main === module) {
    const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log('\n=== Demo Credentials ===');
        console.log('Patient Login:');
        console.log('  Email: patient@example.com');
        console.log('  Password: password123');
        console.log('\nEmployee Login:');
        console.log('  Email: employee@example.com');
        console.log('  Password: password123');
        console.log('========================\n');
    });

    // Keep server alive
    server.on('error', (error) => {
        console.error('Server error:', error);
        process.exit(1);
    });

    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    });

    process.on('SIGINT', () => {
        console.log('\nSIGINT signal received: closing HTTP server');
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    });
}

// Export for Vercel serverless functions
module.exports = app;
