import { useLocation, useParams } from 'react-router-dom';
import useAnswersList from '../../../hooks/useAnswersList';

import _ from 'lodash';
import Analysis from '../../analysis/Analysis';
import Summary from '../../summary/Summary';
import './result.css';


const Result = () => {
    const { id } = useParams();
    const { loading, error, answers } = useAnswersList(id)
    const location = useLocation()
    const { state } = location;

    function calculate() {
        let score = 0;
        answers.forEach((question, index1) => {
            let correctIndexes = [], checkedIndexes = [];
            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2)
                if (state[index1].options[index2].checked) {
                    checkedIndexes.push(index2);
                    option.checked = true;
                }
            })

            if (_.isEqual(correctIndexes, checkedIndexes)) {
                score = score + 5;
            }



        })
        return score;
    }
    const userScore = calculate();

    console.log(answers)
    return (
        <>
            {answers && answers.length > 0 && (

                <>
                    <Summary userScore={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>



            )}
        </>
    )
}

export default Result