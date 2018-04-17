import React, { Component } from 'react'
import _ from 'lodash'
import Resource from './Resource'

export default ({ resources }) => (
	<div>
		{_.map(resources, (value, resource) => (
			<div key={resource}>
				<Resource name={resource} />: {Math.round(value)}
			</div>
		))}
	</div>
)
