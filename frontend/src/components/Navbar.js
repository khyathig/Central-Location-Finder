import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h2 className="navbar-logo">Central Location Finder</h2>
            <div className="navbar-links">
                {!isLoggedIn ? (
                    <>
                        <Link to="/signup" className="navbar-link">Signup</Link>
                        <Link to="/login" className="navbar-link">Login</Link>
                    </>
                ) : (
                    <>
                        <Link to="/" className="navbar-link">Find Location</Link>
                        <Link to="/events" className="navbar-link">Events</Link>
                        <button onClick={handleLogout} className="navbar-link navbar-btn">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
