import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import ms from 'ms'
import { requestGameLoop, store } from './gameloop'

import Houses from './components/Houses'
import Resources from './components/Resources'
import Population from './components/Population'
import BuildQueue from './components/BuildQueue'
import Laird from './components/Laird'
import Loans from './components/Loans'

import { WELCOME_FIRST_START } from './strings/general'

import pkg from '../package.json'

import '../node_modules/bulma/css/bulma.css'
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

		// Data
		const { ticks, houses, resources, buildQueue, laird, loans, messages, population } = store.state

		// Actions
		const { build, takeLoan, paybackLoan } = store

		// Getters
		const { queueEmpty } = store

		const milliseconds = ticks / 60 * 1000
		const time = ticks < 60 ? '0 seconds' : ms(milliseconds, { long: true })
		const lastMessages = _.takeRight(messages, 3)

		return (
			<div>
				<pre className="log">
					<div>News in your Kingdom:</div>
					<div>
						{lastMessages.map(message => (
							<div>
								{message}
								<br />
							</div>
						)) || WELCOME_FIRST_START}
					</div>
				</pre>
				<section className="section">
					<div className="container">
						<div>
							Ticks: {ticks}, Time: {time}
						</div>

						<div className="columns">
							<div className="column is-one-third">
								<h3 className="is-size-5">Buildings</h3>

								<Houses houses={houses} build={build} />
							</div>

							<div className="column is-two-thirds columns">
								<div className="column is-one-quarter">
									<h3 className="is-size-5">Build Queue</h3>

									<BuildQueue queue={buildQueue} isEmpty={queueEmpty} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">Resources</h3>

									<Resources resources={resources} />

									<h3 className="is-size-5">Population</h3>

									<Population population={population} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">The Laird</h3>

									<Laird laird={laird} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">Loans</h3>

									<Loans loans={loans} takeLoan={takeLoan} paybackLoan={paybackLoan} />
								</div>
							</div>
						</div>
					</div>
				</section>

				<pre>{JSON.stringify(store.state, null, 4)}</pre>

				<footer className="footer">
					<div className="container">
						<div className="content has-text-centered">
							<p>
								<strong>The Laird</strong> by <a href="https://github.com/inhji">Inhji</a>.{' '}
								<span>
									Version <em>{pkg.version}</em>
								</span>
							</p>
						</div>
					</div>
				</footer>
			</div>
		)
	}
}

export default App
