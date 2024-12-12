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
    const userInputContent = userInput;

    // This function checks if the result is valid
    function setResultIsValid(duration){
        if(duration > 0 && resultData.length > 0){
            return true;
        }
        return false;
    }

    // useEffect is a hook that allows you to perform side effects in function components
    useEffect(() => {
        const results = getResults();
        setResultData(results);
    }, [userInputContent]);

    // This function updates the user input state
    function handleInputChange(inputField, event) {
        setUserInput({
            ...userInput,
            [inputField]: event.target.value
        });
    }

    // This function calculates the investment results
    function getResults() {
        const { initialInvestment, annualInvestment, expectedReturn, duration } = userInput;
        if (!initialInvestment || !annualInvestment || !expectedReturn || duration <=0){
            return [];
        } 
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
        { setResultIsValid(userInputContent.duration) ? <Results resultData={resultData} /> : <p className="center">The result is not valid.</p>}
        </>
    )
}