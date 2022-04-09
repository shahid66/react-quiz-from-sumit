import NavBar from "../navBar/NavBar"
import './layOut.css'

const LayOut = ({ children }) => {
    return (
        <>
            <NavBar />
            <main className="main">
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}

export default LayOut