import React, { Component } from 'react'
import _ from 'lodash'

export default ({ houses, build }) => (
	<div>
		{houses.map(house => (
			<div
				key={house.name}
				className="columns"
				title={`${house.count}x (${house.working} working)`}
			>
				<div className="column">
					<div>
						{house.prettyName}: {house.count}/{house.working}
					</div>
					<div>
						{_.map(house.cost, (value, resource) => (
							<div>
								{resource}: {value}
							</div>
						))}
					</div>
				</div>
				<div className="column">
					{!house.unique && (
						<button
							onClick={e => {
								e.preventDefault()
								build(house.name)
							}}
						>
							Build
						</button>
					)}
				</div>
			</div>
		))}
	</div>
)
