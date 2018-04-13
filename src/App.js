import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import { requestGameLoop, store } from './gameloop'

import Houses from './components/Houses'
import Resources from './components/Resources'
import BuildQueue from './components/BuildQueue'

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

		const { ticks, houses, resources, buildQueue } = store.state

		return (
			<div>
				<section className="section">
					<div className="container">
						<div>Ticks: {ticks}</div>

						<div className="columns">
							<div className="column is-one-third">
								<Houses houses={houses} build={store.build} />
							</div>

							<div className="column is-one-third">
								<Resources resources={resources} />
							</div>

							<div className="column is-one-third">
								<BuildQueue queue={buildQueue} isEmpty={store.queueEmpty} />
							</div>
						</div>
					</div>
				</section>

				<pre>{JSON.stringify(store.state, null, 3)}</pre>
			</div>
		)
	}
}

export default App
