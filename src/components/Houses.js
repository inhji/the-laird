import React, { Component } from 'react'

export default ({ houses, build }) => (
	<div>
		{houses.map(house => (
			<div key={house.name}>
				<div>
					{house.name}: {house.count}x ({house.working} working)
				</div>
				<button
					onClick={e => {
						e.preventDefault()
						build(house.name)
					}}
				>
					Build one
				</button>
			</div>
		))}
	</div>
)
