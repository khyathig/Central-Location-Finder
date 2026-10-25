import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok && data.token) {
                login(data.token);
                alert('Login Successful');
                navigate('/');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            alert('Server error');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
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
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
