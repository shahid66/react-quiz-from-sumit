import { NavLink } from 'react-router-dom'
import Account from "../account/Account"
import logo from '../assets/images/logo-bg.png'
import './navBar.css'

const NavBar = () => {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to="/" className="brand">
                        <img src={logo} alt=" logo" />
                        <h3>Learn with Sumit</h3>
                    </NavLink>
                </li>
            </ul>
            <Account />
        </nav>
    )
}

export default NavBar