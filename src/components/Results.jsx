import { formatter } from '../util/investment';

export default function Results({ resultData }){
    const initialInvestment = resultData[0]?.valueEndOfYear - resultData[0]?.interest - resultData[0]?.annualInvestment;
    return (
        <div id="result" className="center">
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Investmentvalue</th>
                        <th>Interest(Year)</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(resultData) && resultData.map((result) => {
                            const totalInvestment = result.valueEndOfYear - (result.annualInvestment * result.year) - initialInvestment;
                            const capitalInvestment = result.valueEndOfYear - totalInvestment;
                            return (
                                <tr className="center" key={result.year}>
                                    <td>{result.year}</td>
                                    <td>{formatter.format(result.valueEndOfYear)}</td>
                                    <td>{formatter.format(result.interest)}</td>
                                    <td>{formatter.format(totalInvestment)}</td>
                                    <td>{formatter.format(capitalInvestment)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}