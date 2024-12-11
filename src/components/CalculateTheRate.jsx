import {useState, useEffect} from 'react';
import { calculateInvestmentResults } from '../util/investment';
import Results from './Results';

export default function CalculateTheRate(){
    const [userInput, setUserInput] = useState({
        initialInvestment: 0,
        annualInvestment: 0,
        expectedReturn: 0,
        duration: 0
    });

    const [resultData, setResultData] = useState([]);
    const resultIsValid = resultData.duration >= 0; 
    const userInputContent = userInput;

    useEffect(() => {
        const results = getResults();
        setResultData(results);
    }, [userInputContent]);

    function handleInputChange(inputField, event) {
        setUserInput({
            ...userInput,
            [inputField]: event.target.value
        });
    }

    function getResults() {
        const { initialInvestment, annualInvestment, expectedReturn, duration } = userInput;
        if (!initialInvestment || !annualInvestment || !expectedReturn || !duration) return [];
        return calculateInvestmentResults({
            initialInvestment: +initialInvestment,
            annualInvestment: +annualInvestment,
            expectedReturn: +expectedReturn,
            duration: +duration
        });
    }

    return (
        <>
        <div id="user-input">
            <div className ="input-group">
                <div className='input-content'>
                    <label>Initial Investment</label>
                    <input type="number" value={userInput.initialInvestment} onChange={(e)=>handleInputChange('initialInvestment', e)} />
                </div>
                <div className='input-content'>
                    <label>Annual Investment</label>
                    <input type="number" value={userInput.annualInvestment} onChange={(e)=>handleInputChange('annualInvestment', e)} />
                </div>
                <div className='input-content'>
                    <label>Expected Return</label>
                    <input type="number" value={userInput.expectedReturn} onChange={(e)=>handleInputChange('expectedReturn', e)} />
                </div>
                <div className='input-content'>
                    <label>Duration</label>
                    <input type="number" value={userInput.duration} onChange={(e)=>handleInputChange('duration', e)} />
                </div>
            </div>
        </div>
        { resultIsValid ? <Results resultData={resultData} /> : <p className="center">The result is not valid.</p>}
        </>
    )
}