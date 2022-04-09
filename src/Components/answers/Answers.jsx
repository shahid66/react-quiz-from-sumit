import React from 'react'
import CheckBox from '../checkBox/CheckBox'
import './answers.css'

const Answers = ({ options = [], handelChange, input }) => {

    return (
        <div className='answers'>
            {options.map((option, index) => (
                <React.Fragment key={index}>
                    {input ? (
                        <CheckBox key={index} className="answer" text={option.title} value={index} checked={option.checked} onChange={(e) => handelChange(e, index)} />
                    ) : (
                        <CheckBox key={index} className={`answer ${option.correct ? 'correct' : option.checked ? 'wrong' : null}`} text={option.title} value={index} defaultChecked={option.checked}
                            disabled
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Answers