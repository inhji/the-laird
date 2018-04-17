import React from 'react'

export default ({ laird }) => (
	<div>
		<div>Rage: {laird.rage}</div>
		<div>Greed: {laird.greed}</div>
		<div>Debt: {Math.round(laird.debt)}</div>
	</div>
)
