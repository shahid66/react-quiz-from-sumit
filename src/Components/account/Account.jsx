import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './account.css';

const Account = () => {
    const { currentUser, logOut } = useAuth();
    return (
        <div className="account">
            {currentUser ? (
                <>
                    <span className="material-icons-outlined" title="Account">
                        account_circle
                    </span>
                    <span>{currentUser.displayName}</span>
                    <span className="material-icons-outlined" title="Logout" onClick={logOut}> logout </span>
                </>
            ) : (
                <>
                    <NavLink to="/signup">Signup</NavLink>
                    <NavLink to="/login">LogIn</NavLink>
                </>
            )}


        </div>
    )
}

export default Account