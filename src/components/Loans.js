import React from 'react'

export default ({ loans, takeLoan, paybackLoan }) => (
	<div>
		{loans.map(loan => (
			<div key={loan.value}>
				<div>Value: {loan.value}</div>
				<div>Debt: {Math.round(loan.value * loan.modifier)}</div>
				<div>
					{loan.taken ? (
						<button onClick={() => paybackLoan(loan.name)}>Pay back</button>
					) : (
						<button onClick={() => takeLoan(loan.name)}>Take</button>
					)}
				</div>
			</div>
		))}
	</div>
)
