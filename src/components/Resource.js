import React from 'react'
import _ from 'lodash'
import { capitalize } from '../helpers'

export default ({ name, prettyName }) => (
	<span>
		<img src={`/img/resources/${name}.png`} width="16" /> {prettyName || capitalize(name)}
	</span>
)
