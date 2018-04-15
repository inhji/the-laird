import React from 'react'

export default ({ loans }) => (
	<div>
		{loans.map(loan => (
			<div key={loan.value}>
				<div>Value: {loan.value}</div>
				<div>Debt: {Math.round(loan.value * loan.modifier)}</div>
				<div>
					<button>Take</button>
				</div>
			</div>
		))}
	</div>
)
