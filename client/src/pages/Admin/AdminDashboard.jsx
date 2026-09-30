import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [roleFilter, setRoleFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        // Placeholder: Fetch all users from your GET /api/users endpoint
        // Example: fetchWithAuth(`/users?role=${roleFilter}`).then(setUsers);
    }, [roleFilter]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #eee' }}>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} style={{ height: '35px', marginTop: '20px' }}>Logout</button>
            </header>

            <section style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h2>User Management</h2>
                    <button style={{ height: '35px' }}>+ Create New User</button>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ marginRight: '10px' }}>Filter by Role: </label>
                    <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="all">All Roles</option>
                        <option value="student">Students</option>
                        <option value="advisor">Advisors</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                    <tr style={{ backgroundColor: '#f9f9f9', borderBottom: '2px solid #ccc' }}>
                        <th style={{ padding: '10px' }}>Name</th>
                        <th style={{ padding: '10px' }}>Email</th>
                        <th style={{ padding: '10px' }}>Role</th>
                        <th style={{ padding: '10px' }}>Student ID</th>
                        <th style={{ padding: '10px' }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Map through your users array here */}
                    <tr>
                        <td colSpan="5" style={{ padding: '10px', textAlign: 'center' }}>No users loaded.</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}