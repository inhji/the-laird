import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import { requestGameLoop, store } from './gameloop'
import './App.css'

@observer
class App extends Component {
	componentDidMount() {
		requestGameLoop()
	}

	render() {
		if (!store) {
			return <div>loading..</div>
		}

		const { ticks, houses, resources } = store.state

		return (
			<div>
				<div>Ticks: {ticks}</div>
				<div>
					{houses.map(house => (
						<div key={house.name}>
							<div>
								{house.name}: {house.count}x ({house.working} working)
							</div>
							<button
								onClick={e => {
									e.preventDefault()
									store.build(house.name)
								}}
							>
								Build one
							</button>
						</div>
					))}
				</div>

				<div>
					{_.map(resources, (value, resource) => (
						<div key={resource}>
							{resource}: {Math.round(value)}
						</div>
					))}
				</div>

				<pre>{JSON.stringify(store.state, null, 3)}</pre>
			</div>
		)
	}
}

export default App
