import { useState } from "react";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import signupImg from '../assets/images/signup.svg';
import Button from "../button/Button";
import CheckBox from "../checkBox/CheckBox";
import Form from '../form/Form';
import Illustration from '../illustration/Illustration';
import TextInput from '../textInput/TextInput';
import './signUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [agree, setAgree] = useState("")
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmpassword) {
            return setError("Password don't match!");
        }

        try {
            setError("");
            setLoading(true);
            await signup(email, password, username);
            navigate('/')
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError("Failed to create an account! ");
        }
    }
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration image={signupImg} />
                <Form className="signup" onSubmit={handleSubmit}>
                    <TextInput type="text" placeholder="Enter Your Name" icon={<FaUserAlt />} value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <TextInput type="email" placeholder="Enter Your Email" icon={<FaEnvelope />} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextInput type="password" placeholder="Enter Your Password" icon={<FaLock />} value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <TextInput type="password" placeholder="Confirm Password" icon={<FaLock />} value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
                    {error && <p className="error">{error}</p>}
                    <CheckBox text="I agree to the Terms &amp; Conditions" value={agree} onChange={(e) => setAgree(e.target.value)} required />
                    <Button disabled={loading} type='submit'>
                        <span>Submit now</span>
                    </Button>
                    <div className="info">
                        Already have an account? <NavLink to="/login">Login</NavLink> instead.
                    </div>
                </Form>
            </div>
        </>
    )
}

export default SignUp