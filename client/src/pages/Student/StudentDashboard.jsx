import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getMyRegistrations } from '../../api'; // Assuming you add this to api.js

export default function StudentDashboard() {
    const [registrations, setRegistrations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Example fetch call (you will need to connect this to your actual API route)
        /*
        async function loadData() {
          try {
            const data = await getMyRegistrations();
            setRegistrations(data);
          } catch (err) {
            console.error(err);
          }
        }
        loadData();
        */
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee' }}>
                <h1>Student Dashboard</h1>
                <button onClick={handleLogout} style={{ height: '35px', marginTop: '20px' }}>Logout</button>
            </header>

            <section style={{ marginTop: '20px' }}>
                <h2>Current Term Registrations</h2>
                {/* Placeholder for the table of registered courses */}
                <p>No courses loaded yet.</p>
            </section>

            <section style={{ marginTop: '20px' }}>
                <h2>Academic Record</h2>
                {/* Placeholder for past grades and GPA */}
            </section>
        </div>
    );
}