import { useState } from "react"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import loginImg from '../assets/images/login.svg'
import Button from "../button/Button"
import Form from "../form/Form"
import Illustration from "../illustration/Illustration"
import TextInput from "../textInput/TextInput"
import './login.css'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { logIn } = useAuth();

    async function handelSubmit(e) {
        e.preventDefault();

        try {
            logIn(email, password);
            navigate('/')
        } catch (err) {
            console.log(err)
            
        }
    }
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration image={loginImg} />

                <Form className="login" onSubmit={handelSubmit}>
                    <TextInput type="email" placeholder="Enter Your Email" icon={<FaEnvelope />} value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextInput type="password" placeholder="Enter Your Password" icon={<FaLock />} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit">
                        <span>Submit now</span>
                    </Button>
                    <div className="info">Don't have an account? <NavLink to="/signup">Signup</NavLink> instead.</div>
                </Form>
            </div>
        </>
    )
}

export default Login