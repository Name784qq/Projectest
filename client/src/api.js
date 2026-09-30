// src/api.js
const API_URL = 'http://localhost:5000/api';

// Helper function to handle the fetch and attach the JWT token
async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
}

export const loginUser = (credentials) =>
    fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

export const getStudentRecords = (studentId) =>
    fetchWithAuth(`/students/${studentId}/record`);

export const getEligibleCourses = (studentId, term) =>
    fetchWithAuth(`/students/${studentId}/eligible?term=${term}`);