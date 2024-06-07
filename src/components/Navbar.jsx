import { Link } from "react-router-dom"
import LLLogo from '../assets/images/LittleLemonLogo.png';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li className='logo'>
                    <Link to={'/'}><img src={LLLogo} alt='Little Lemon Logo' loading='lazy' /></Link>
                </li>
                <li><Link to={'/'}>Home</Link></li>
                <li><a href="#">About</a></li>
                <li>
                    <Link to={'/#highlights-section'} onClick={() => document.getElementById('highlights-section').scrollIntoView({ behavior: 'smooth' })}>Menu</Link>
                </li>
                <li><a href="#">Reservations</a></li>
                <li><a href="#">Order Online</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    )
}
