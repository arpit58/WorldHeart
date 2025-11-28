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

        // Enhanced prediction logic using weighted risk factors
        let riskScore = 0;

        // Age factor (0-25 points)
        if (age < 40) riskScore += 5;
        else if (age >= 40 && age < 50) riskScore += 10;
        else if (age >= 50 && age < 60) riskScore += 15;
        else if (age >= 60 && age < 70) riskScore += 20;
        else riskScore += 25;

        // Sex factor (0-10 points) - Male higher risk
        if (sex === 1) riskScore += 10;
        else riskScore += 5;

        // Chest Pain Type (0-20 points)
        if (cp === 0) riskScore += 20; // Typical angina - highest risk
        else if (cp === 1) riskScore += 15; // Atypical angina
        else if (cp === 2) riskScore += 10; // Non-anginal pain
        else riskScore += 5; // Asymptomatic

        // Blood Pressure (0-15 points)
        if (trestbps < 120) riskScore += 3;
        else if (trestbps >= 120 && trestbps < 140) riskScore += 7;
        else if (trestbps >= 140 && trestbps < 160) riskScore += 12;
        else riskScore += 15;

        // Cholesterol (0-15 points)
        if (chol < 200) riskScore += 3;
        else if (chol >= 200 && chol < 240) riskScore += 8;
        else if (chol >= 240 && chol < 280) riskScore += 12;
        else riskScore += 15;

        // Fasting Blood Sugar (0-5 points)
        if (fbs === 1) riskScore += 5;

        // Resting ECG (0-5 points)
        if (restecg === 1) riskScore += 3;
        else if (restecg === 2) riskScore += 5;

        // Max Heart Rate (0-10 points) - Lower is riskier
        if (thalach < 100) riskScore += 10;
        else if (thalach < 120) riskScore += 7;
        else if (thalach < 150) riskScore += 4;
        else riskScore += 2;

        // Exercise Induced Angina (0-10 points)
        if (exang === 1) riskScore += 10;

        // ST Depression (0-10 points)
        if (oldpeak >= 3) riskScore += 10;
        else if (oldpeak >= 2) riskScore += 7;
        else if (oldpeak >= 1) riskScore += 4;

        // Slope (0-5 points)
        if (slope === 0) riskScore += 5; // Downsloping
        else if (slope === 1) riskScore += 3; // Flat
        else riskScore += 1; // Upsloping

        // Number of Major Vessels (0-10 points)
        riskScore += ca * 3;

        // Thalassemia (0-10 points)
        if (thal === 3) riskScore += 10; // Reversible defect
        else if (thal === 2) riskScore += 7; // Fixed defect
        else if (thal === 1) riskScore += 3; // Normal

        // Calculate probability (0-100%)
        // Max possible score is ~145, normalize to percentage
        let probability = Math.min(Math.round((riskScore / 145) * 100), 99);
        
        // Ensure minimum 5% to show some risk always exists
        probability = Math.max(probability, 5);

        // Determine risk category
        let prediction = 'Low Risk';
        if (probability >= 70) {
            prediction = 'High Risk';
        } else if (probability >= 40) {
            prediction = 'Medium Risk';
        }

        // Identify key risk factors
        const riskFactors = [];
        if (age >= 55) riskFactors.push('Age over 55');
        if (chol >= 240) riskFactors.push('High Cholesterol');
        if (trestbps >= 140) riskFactors.push('High Blood Pressure');
        if (exang === 1) riskFactors.push('Exercise Induced Angina');
        if (cp === 0 || cp === 1) riskFactors.push('Chest Pain');
        if (thalach < 120) riskFactors.push('Low Max Heart Rate');
        if (ca >= 1) riskFactors.push('Blocked Vessels');

        res.json({
            prediction,
            probability,
            message: `Based on the provided data, the patient has ${prediction.toLowerCase()} of heart disease.`,
            riskScore: Math.round(riskScore),
            factors: {
                age,
                sex: sex === 1 ? 'Male' : 'Female',
                cholesterol: chol,
                bloodPressure: trestbps,
                maxHeartRate: thalach,
                chestPainType: ['Typical Angina', 'Atypical Angina', 'Non-anginal Pain', 'Asymptomatic'][cp] || 'Unknown'
            },
            keyRiskFactors: riskFactors.length > 0 ? riskFactors : ['No major risk factors identified']
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
