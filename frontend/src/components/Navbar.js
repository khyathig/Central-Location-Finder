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
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Central Location Finder</h2>
            <div>
                {!isLoggedIn ? (
                    <>
                        <Link to="/signup" style={styles.link}>Signup</Link>
                        <Link to="/login" style={styles.link}>Login</Link>
                    </>
                ) : (
                    <>
                        <Link to="/" style={styles.link}>Find Location</Link>
                        <Link to="/events" style={styles.link}>Events</Link>
                        <button onClick={handleLogout} style={{ ...styles.link, background: 'transparent', border: 'none', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#6b21a8',
        padding: '10px 20px',
        color: 'white',
    },
    logo: {
        margin: 0,
    },
    link: {
        marginLeft: '15px',
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
    }
};

export default Navbar;
