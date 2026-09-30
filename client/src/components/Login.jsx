import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Force a page reload so App.jsx catches the newly set localStorage role
        if (email === 'admin@university.edu') {
            localStorage.setItem('role', 'admin');
            window.location.href = '/admin';
        } else if (email === 'advisor@university.edu') {
            localStorage.setItem('role', 'advisor');
            window.location.href = '/advisor';
        } else {
            localStorage.setItem('role', 'student');
            window.location.href = '/student';
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h2>University Registration System</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}