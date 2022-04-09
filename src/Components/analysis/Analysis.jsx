import Question from '../question/Question'
import './analysis.css'

const Analysis = ({ answers }) => {
    return (
        <div className="analysis">
            <h1>Question Analysis</h1>

            <Question answers={answers} />

        </div>
    )
}

export default Analysis