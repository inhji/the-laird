import React from 'react'
import Resource from './Resource'

export default ({ population }) => (
	<div>
		<Resource name="settler" prettyName="Settlers" />: {population.settlers}
	</div>
)
