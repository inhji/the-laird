import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import { requestGameLoop, store } from './gameloop'

import Houses from './components/Houses'
import Resources from './components/Resources'
import BuildQueue from './components/BuildQueue'
import Laird from './components/Laird'
import Loans from './components/Loans'

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

		const { ticks, houses, resources, buildQueue, laird, loans, messages } = store.state

		return (
			<div>
				<pre>Console: {_.last(messages)}</pre>
				<section className="section">
					<div className="container">
						<div>Ticks: {ticks}</div>

						<div className="columns">
							<div className="column is-one-third">
								<h3 className="is-size-5">Buildings</h3>

								<Houses houses={houses} build={store.build} />
							</div>

							<div className="column is-two-thirds columns">
								<div className="column is-one-quarter">
									<h3 className="is-size-5">Build Queue</h3>

									<BuildQueue queue={buildQueue} isEmpty={store.queueEmpty} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">Resources</h3>

									<Resources resources={resources} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">The Laird</h3>

									<Laird laird={laird} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">Loans</h3>

									<Loans loans={loans} />
								</div>
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
