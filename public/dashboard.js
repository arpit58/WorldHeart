const API_URL = 'http://localhost:3000/api';

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

// Initialize dashboard
async function initDashboard() {
    const auth = checkAuth();
    if (!auth) return;
    
    const { token, user } = auth;
    
    // Set user info
    document.getElementById('userName').textContent = `Welcome, ${user.name}`;
    document.getElementById('userRole').textContent = `Role: ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`;
    
    // Show appropriate panel
    if (user.role === 'patient') {
        document.getElementById('panelTitle').textContent = 'Patient Panel';
        document.getElementById('patientPanel').style.display = 'block';
        await loadDataForPanel('patient', token);
    } else if (user.role === 'employee') {
        document.getElementById('panelTitle').textContent = 'Employee Panel';
        document.getElementById('employeePanel').style.display = 'block';
        await loadDataForPanel('employee', token);
    }
}

// Load data for panels (defined later with search/filter support)

// Display patients list
function displayPatients(patients, containerId) {
    const container = document.getElementById(containerId);
    
    if (patients.length === 0) {
        container.innerHTML = '<div class="loading-modern"><p>No patients found.</p></div>';
        return;
    }
    
    const html = patients.map(patient => {
        // Determine risk level and class
        let riskClass = 'risk-low';
        let riskText = 'Low Risk';
        
        if (patient.diagnosis && patient.diagnosis.includes('High')) {
            riskClass = 'risk-high';
            riskText = 'High Risk';
        } else if (patient.diagnosis && patient.diagnosis.includes('Medium')) {
            riskClass = 'risk-medium';
            riskText = 'Medium Risk';
        }
        
        return `
            <div class="modern-patient-card">
                <div class="card-header-row">
                    <div>
                        <h3 class="patient-name">${patient.name}</h3>
                        <p class="patient-age">Age: ${patient.age} years</p>
                    </div>
                    <div class="patient-badge">Patient</div>
                </div>
                <div class="risk-indicator ${riskClass}">
                    <div class="risk-dot"></div>
                    <span>${riskText}</span>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
    
    // Add fade-in animation
    setTimeout(() => {
        container.querySelectorAll('.modern-patient-card').forEach((card, index) => {
            card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        });
    }, 50);
}

// Display employees list
function displayEmployees(employees, containerId) {
    const container = document.getElementById(containerId);
    
    if (employees.length === 0) {
        container.innerHTML = '<div class="loading-modern"><p>No employees found.</p></div>';
        return;
    }
    
    const html = employees.map(employee => `
        <div class="modern-staff-card">
            <div class="card-header-row">
                <div>
                    <h3 class="staff-name">${employee.name}</h3>
                    <p class="staff-department">${employee.department}</p>
                </div>
                <div class="staff-badge">Staff</div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Add fade-in animation
    setTimeout(() => {
        container.querySelectorAll('.modern-staff-card').forEach((card, index) => {
            card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        });
    }, 50);
}

// Logout function
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Search and Filter functionality (for Employee Panel)
let allPatients = [];

function setupSearchAndFilter() {
    const searchInput = document.getElementById('searchPatients');
    const filterSelect = document.getElementById('filterRisk');
    
    if (!searchInput || !filterSelect) return;
    
    searchInput.addEventListener('input', (e) => {
        filterPatientList(e.target.value, filterSelect.value);
    });
    
    filterSelect.addEventListener('change', (e) => {
        filterPatientList(searchInput.value, e.target.value);
    });
}

function filterPatientList(searchTerm, riskFilter) {
    const searchLower = searchTerm.toLowerCase();
    
    const filtered = allPatients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchLower);
        
        let matchesRisk = true;
        if (riskFilter !== 'all') {
            const diagnosis = patient.diagnosis || '';
            if (riskFilter === 'low') {
                matchesRisk = diagnosis.toLowerCase().includes('low');
            } else if (riskFilter === 'medium') {
                matchesRisk = diagnosis.toLowerCase().includes('medium');
            } else if (riskFilter === 'high') {
                matchesRisk = diagnosis.toLowerCase().includes('high');
            }
        }
        
        return matchesSearch && matchesRisk;
    });
    
    displayPatients(filtered, 'employeePatientsListdiv');
}

// Store patients globally for filtering
function storeAndDisplayPatients(patients, containerId) {
    if (containerId === 'employeePatientsListdiv') {
        allPatients = patients;
        setupSearchAndFilter();
    }
    displayPatients(patients, containerId);
}

// Update loadDataForPanel to use new function
async function loadDataForPanel(role, token) {
    try {
        // Fetch patients
        const patientsResponse = await fetch(`${API_URL}/patients`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const patients = await patientsResponse.json();
        
        // Fetch employees
        const employeesResponse = await fetch(`${API_URL}/employees`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const employees = await employeesResponse.json();
        
        // Display based on role
        if (role === 'patient') {
            displayPatients(patients, 'patientsList');
            displayEmployees(employees, 'employeesList');
        } else {
            storeAndDisplayPatients(patients, 'employeePatientsListdiv');
            displayEmployees(employees, 'employeeEmployeesListdiv');
        }
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initDashboard);
