import { Link } from 'react-router-dom';
import Logo from '../images/blog-logo.svg';
import "../styles/header.css";
import { SiReaddotcv } from "react-icons/si";

const Header = () => {
    return (
        <header className="Header">
            <h3 className='logo mb-0'>
                <Link to="/" className='d-flex align-items-center gap-1'>
                    <img src={Logo} alt='Blog Logo' style={{ maxWidth: '40px' }} /> {" "} Blog
                </Link>
            </h3>
            <Link type="button" to="post" className='btn btn-primary blog-filled-button px-4 py-2 d-flex align-items-center gap-2'>
                <SiReaddotcv size={24}/>Add New Post
            </Link>
        </header>
    );
};

export default Header;
