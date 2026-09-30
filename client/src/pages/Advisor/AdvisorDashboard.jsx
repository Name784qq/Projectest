import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdvisorDashboard() {
    const [offerings, setOfferings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Placeholder: Fetch offerings from your GET /api/offerings?term=2026-1 endpoint
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee' }}>
                <h1>Advisor Dashboard</h1>
                <button onClick={handleLogout} style={{ height: '35px', marginTop: '20px' }}>Logout</button>
            </header>

            <section style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h2>Course Offerings (Term: 2026-1)</h2>
                    <button style={{ height: '35px' }}>+ Open New Section</button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '40px' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #ccc' }}>
                        <th style={{ padding: '10px' }}>Course</th>
                        <th style={{ padding: '10px' }}>Section</th>
                        <th style={{ padding: '10px' }}>Schedule</th>
                        <th style={{ padding: '10px' }}>Seats Available</th>
                        <th style={{ padding: '10px' }}>Add/Drop Status</th>
                        <th style={{ padding: '10px' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Map through your offerings array here */}
                    <tr>
                        <td colSpan="6" style={{ padding: '10px', textAlign: 'center' }}>No offerings loaded.</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            <section style={{ borderTop: '2px solid #eee', paddingTop: '20px' }}>
                <h2>Student Registration</h2>
                <div style={{ marginBottom: '15px' }}>
                    <input type="text" placeholder="Enter Student ID to view record..." style={{ padding: '8px', width: '300px', marginRight: '10px' }} />
                    <button style={{ padding: '8px 15px' }}>Fetch Eligible Courses</button>
                </div>
                {/* Placeholder for the student's eligible courses list and registration controls */}
            </section>
        </div>
    );
}