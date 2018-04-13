import React, { Component } from 'react'
import _ from 'lodash'

export default ({ resources }) => (
	<div>
		{_.map(resources, (value, resource) => (
			<div key={resource}>
				{resource}: {Math.round(value)}
			</div>
		))}
	</div>
)
