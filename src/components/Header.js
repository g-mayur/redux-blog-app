import { Link } from 'react-router-dom';
import Logo from '../images/blog-logo.svg';
import "../styles/header.css";

const Header = () => {
    return (
        <header className="Header">
            <h3 className='logo'>
                <Link to="/" className='d-flex align-items-center gap-1'>
                    <img src={Logo} alt='Blog Logo' style={{maxWidth: '40px'}} /> {" "} Blog
                </Link>
            </h3>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="post">Add Post</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
