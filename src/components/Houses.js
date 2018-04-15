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
						<div>
							{house.prettyName}: {house.count}/{house.working}
						</div>
						<div>{house.productionPerSecond}/s</div>
					</div>
				</div>
				<div className="column">
					{!house.unique && (
						<div>
							<button
								onClick={e => {
									e.preventDefault()
									build(house.name)
								}}
							>
								Build
							</button>
							<div>
								{_.map(house.cost, (value, resource) => (
									<div>
										{resource}: {value}
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		))}
	</div>
)
