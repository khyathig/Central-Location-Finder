import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Central Location Finder</h2>
            <div>
                <Link to="/signup" style={styles.link}>Signup</Link>
                <Link to="/login" style={styles.link}>Login</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#007bff',
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
