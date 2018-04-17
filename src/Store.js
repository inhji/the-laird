import { action, configure, observable, computed } from 'mobx'
import _ from 'lodash'
import House from './classes/House'
import Loan from './classes/Loan'

configure({ enforceActions: true })

const BASE_PRODUCTION = 0.025
const BASE_BUILD_SPEED = 0.25

export default class Store {
	@observable
	state = {
		ticks: 0,
		messages: [],
		population: {
			settlers: 0
		},
		resources: {
			bread: 0,
			crop: 0,
			water: 0,
			wood: 30,
			stone: 30,
			gold: 100
		},
		laird: {
			greed: 0,
			rage: 0,
			debt: 0
		},
		loans: [
			new Loan({ name: 'small', value: 100, modifier: 1.1, interest: 0.0001 }),
			new Loan({ name: 'medium', value: 200, modifier: 1.15, interest: 0.00015 }),
			new Loan({ name: 'large', value: 500, modifier: 1.2, interest: 0.0002 })
		],
		buildQueue: [],
		houses: [
			new House({
				name: 'kingshall',
				prettyName: "King's Hall",
				count: 1,
				base: BASE_PRODUCTION / 100,
				produces: 'gold',
				unique: true
			}),
			new House({
				prettyName: 'Settlers House',
				name: 'settlerhouse',
				count: 5,
				population: 2,
				cost: {
					wood: 15,
					stone: 15
				}
			}),
			new House({
				name: 'logger',
				prettyName: 'Logger',
				cost: {
					gold: 10,
					wood: 10,
					stone: 10
				},
				produces: 'wood',
				base: BASE_PRODUCTION
			}),
			new House({
				name: 'quarry',
				prettyName: 'Quarry',
				cost: {
					gold: 10,
					wood: 10,
					stone: 10
				},
				produces: 'stone',
				base: BASE_PRODUCTION
			}),
			new House({
				name: 'well',
				prettyName: 'Well',
				cost: {
					stone: 5,
					gold: 10
				},
				produces: 'water',
				base: BASE_PRODUCTION
			}),
			new House({
				name: 'farm',
				prettyName: 'Farm',
				cost: {
					wood: 30,
					gold: 20
				},
				produces: 'crop',
				consumes: {
					water: 1
				},
				base: BASE_PRODUCTION
			}),
			new House({
				name: 'bakery',
				prettyName: 'Bakery',
				cost: {
					wood: 20,
					stone: 20,
					gold: 20
				},
				produces: 'bread',
				consumes: {
					crop: 1,
					water: 1,
					wood: 0.5
				},
				base: BASE_PRODUCTION,
				modifiers: [{ name: 'apprentice', lvl: 0, value: 0 }]
			})
		]
	}

	@computed
	get queueEmpty() {
		return this.state.buildQueue.length === 0
	}

	@action.bound
	tick() {
		this.state.ticks++
	}

	update() {
		this.tick()

		this.updateState('houses', this.updateHouses(this.state))
		this.updateState('buildQueue', this.updateBuildQueue(this.state))
		this.updateState('population', this.updatePopulation(this.state))
	}

	@action
	updateState(key, value) {
		this.state[key] = value
	}

	canBuild({ cost, unique = false }) {
		if (unique) return false

		return Object.entries(cost).every(([type, amount]) => {
			return this.state.resources[type] >= amount
		})
	}

	@action.bound
	build(name) {
		const house = this.findHouseByName(name)

		if (this.canBuild(house)) {
			_.forEach(house.cost, (amount, type) => this.pay(type, amount))

			this.addToBuildQueue(house)
			this.state.messages.push(`Building a ${house.prettyName}`)
		} else {
			alert('you cannnot build this')
		}
	}

	@action.bound
	takeLoan(name) {
		const loan = this.findLoanByName(name)

		this.state.laird.debt += loan.debt
		this.state.resources.gold += loan.value

		this.state.messages.push(`You have taken a ${loan.name} loan of ${loan.value} gold.`)

		loan.take()
	}

	@action.bound
	paybackLoan(name) {
		const loan = this.findLoanByName(name)

		if (loan.debt > this.state.resources.gold) {
			alert('you cannot pay back this loan')
		} else {
			this.state.laird.debt -= loan.debt
			this.state.resources.gold -= loan.debt

			this.state.messages.push(`You payed back your ${loan.name} loan. The laird is pleased.`)

			loan.payback()
		}
	}

	@action
	addToBuildQueue({ name, prettyName }) {
		this.state.buildQueue.push({
			prettyName,
			name,
			percent: 0
		})
	}

	@action
	pay(type, amount) {
		this.state.resources[type] -= amount
	}

	@action
	updatePopulation(state) {
		return {
			settlers: state.houses.reduce((result, house) => {
				if (house.population) {
					result += house.population * house.count
				} else if (!house.population && !house.unique) {
					result -= 1 * house.count
				}

				return result
			}, 0)
		}
	}

	@action
	updateBuildQueue(state) {
		return state.buildQueue
			.map(item => {
				item.percent += BASE_BUILD_SPEED

				return item
			})
			.filter(item => {
				const done = item.percent > 100

				if (done) {
					const house = this.findHouseByName(item.name)
					this.state.messages.push(`Building ${item.prettyName} completed!`)
					house.count++
				}

				return !done
			})
	}

	@action
	updateHouses(state) {
		return state.houses.map(house => {
			const houseProduced = this.calcProduced(house, state.resources)
			if (houseProduced === 0) {
				return house
			}

			if (house.consumes) {
				for (var i = house.consumes.length - 1; i >= 0; i--) {
					const type = house.consumes[i]
					state.resources[type] -= house.consumes[type] * house.working
				}
			}

			state.resources[house.produces] += houseProduced

			return house
		})
	}

	findHouseByName(name) {
		const i = _.findIndex(this.state.houses, h => h.name === name)
		return this.state.houses[i]
	}

	findLoanByName(name) {
		const loan = _.find(this.state.loans, l => l.name === name)
		return loan
	}

	calcModifier(modifiers) {
		if (modifiers.length === 0) {
			return 0
		}

		const sum = modifiers.map(m => m.value).reduce((s, val) => {
			s += val
			return s
		}, 0)
		return sum / modifiers.length
	}

	/*
	 * calcProduced (house: Object, resources: Object)
	 *   => Number
	 * Calculates the max amount of produced goods
	 * given the house's capabilies and your resources
 	*/
	calcProduced(house, resources) {
		const { base, modifiers, consumes } = house
		const oneHouse = base + this.calcModifier(modifiers)
		let count = house.count

		// Working with full steam
		if (consumes === null) {
			house.working = house.count
			return oneHouse * count
		}

		// All hope is lost
		if (count === 0) {
			house.working = 0
			return 0
		}

		// determine how much houses can produce
		while (count > 0) {
			if (this.canProduce(count, consumes, resources)) {
				house.working = count
				return oneHouse * count
			}
			count--
		}

		// if no house can produce, return zer0
		return 0
	}

	canProduce(count, consumes, resources) {
		for (let key in consumes) {
			const resource = consumes[key]
			const total = resource * count
			if (total > resources[key]) {
				return false
			}
		}

		return true
	}
}
