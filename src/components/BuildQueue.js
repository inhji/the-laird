import React from 'react'

export default ({ queue, isEmpty }) => (
	<div>
		{isEmpty ? (
			<div>Empty</div>
		) : (
			queue.map(item => (
				<div key={`${item.name}-${item.percent}`}>
					{item.name}: {Math.round(item.percent)}%
				</div>
			))
		)}
	</div>
)
