const API_URL = '/api';

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !user.email) {
        window.location.href = 'login.html';
        return null;
    }
    
    return { token, user };
}

// Text-to-Speech function
function speakResult(text) {
    const enableVoice = document.getElementById('enableVoice').checked;
    if (!enableVoice) return;
    
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Text-to-speech not supported in this browser');
    }
}

// Global chart variables
let riskChart = null;
let featureChart = null;

// Logout function
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Handle prediction form submission
document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const auth = checkAuth();
    if (!auth) return;
    
    const formData = new FormData(e.target);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = parseFloat(value);
    });
    
    const errorMsg = document.getElementById('errorMessage');
    const submitBtn = e.target.querySelector('button[type="submit"]');
    
    errorMsg.classList.remove('show');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.token}`
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Prediction failed');
        }
        
        displayResult(result);
        
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.add('show');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Display prediction result
function displayResult(result) {
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');
    
    let riskClass = 'result-low-risk';
    let riskIcon = '✅';
    
    if (result.prediction === 'High Risk') {
        riskClass = 'result-high-risk';
        riskIcon = '⚠️';
    } else if (result.prediction === 'Medium Risk') {
        riskClass = 'result-medium-risk';
        riskIcon = '⚡';
    }
    
    const html = `
        <div class="${riskClass}">
            <div class="result-title">${riskIcon} ${result.prediction}</div>
            <div class="result-probability">Probability: ${result.probability}%</div>
            <div class="result-message">${result.message}</div>
        </div>
        
        <div class="result-factors">
            <h4>Key Factors:</h4>
            <p><strong>Age:</strong> ${result.factors.age} years</p>
            <p><strong>Cholesterol:</strong> ${result.factors.cholesterol} mg/dl</p>
            <p><strong>Blood Pressure:</strong> ${result.factors.bloodPressure} mm Hg</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
            <a href="dashboard.html" class="btn btn-secondary">Back to Dashboard</a>
        </div>
    `;
    
    resultContent.innerHTML = html;
    resultSection.style.display = 'block';
    
    // Speak the result
    const voiceMessage = `Prediction result: ${result.prediction}. The probability is ${result.probability} percent. ${result.message}`;
    speakResult(voiceMessage);
    
    // Create charts
    createRiskChart(result);
    createFeatureChart(result);
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Create risk probability chart
function createRiskChart(result) {
    const ctx = document.getElementById('riskChart');
    
    // Destroy existing chart if it exists
    if (riskChart) {
        riskChart.destroy();
    }
    
    const riskPercentage = result.probability;
    const safePercentage = 100 - result.probability;
    
    riskChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Risk', 'Safe'],
            datasets: [{
                label: 'Risk Assessment',
                data: [riskPercentage, safePercentage],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Heart Disease Risk Distribution',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

// Create feature importance chart
function createFeatureChart(result) {
    const ctx = document.getElementById('featureChart');
    
    // Destroy existing chart if it exists
    if (featureChart) {
        featureChart.destroy();
    }
    
    const factors = result.factors;
    
    // Calculate normalized scores for visualization
    const ageScore = Math.min((factors.age / 80) * 100, 100);
    const cholScore = Math.min((factors.cholesterol / 300) * 100, 100);
    const bpScore = Math.min((factors.bloodPressure / 180) * 100, 100);
    
    featureChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Age Factor', 'Cholesterol', 'Blood Pressure'],
            datasets: [{
                label: 'Risk Factor Contribution (%)',
                data: [ageScore, cholScore, bpScore],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Key Health Factors Analysis',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

// Check auth on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});
