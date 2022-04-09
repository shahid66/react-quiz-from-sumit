import image from '../assets/images/success.png'
import './summary.css'

const Summary = ({ userScore, noq }) => {
    return (
        <div className="summary">
            <div className="point">

                <p className="score">
                    Your score is <br />
                    {userScore} out of {noq * 5}
                </p>
            </div>

            <div className="badge">
                <img src={image} alt="Success" />
            </div>
        </div>
    )
}

export default Summary