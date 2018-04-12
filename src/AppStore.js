import { observable } from 'mobx'
import _ from 'lodash'

const BASE_PRODUCTION = 0.025
const BASE_BUILD_SPEED = 0.25

export default class AppStore {
	@observable
	state = {
		ticks: 0,
		resources: {
			bread: 0,
			crop: 0,
			water: 0,
			wood: 0,
			gold: 100
		},
		buildQueue: [],
		houses: [
			{
				name: 'logger',
				count: 0,
				cost: {
					gold: 10
				},
				produced: 0,
				produces: 'wood',
				working: 0,
				base: BASE_PRODUCTION,
				consumes: null,
				modifiers: []
			},
			{
				name: 'well',
				count: 0,
				cost: {
					gold: 10
				},
				produced: 0,
				produces: 'water',
				working: 0,
				base: BASE_PRODUCTION,
				consumes: null,
				modifiers: []
			},
			{
				name: 'farm',
				count: 0,
				cost: {
					gold: 20
				},
				produced: 0,
				produces: 'crop',
				working: 0,
				consumes: {
					water: 1
				},
				base: BASE_PRODUCTION,
				modifiers: []
			},
			{
				name: 'bakery',
				count: 0,
				cost: {
					gold: 20
				},
				produced: 0,
				produces: 'bread',
				working: 0,
				consumes: {
					crop: 1,
					water: 1,
					wood: 0.5
				},
				base: BASE_PRODUCTION,
				modifiers: [{ name: 'apprentice', lvl: 0, value: 0 }]
			}
		]
	}

	update() {
		this.state.ticks++

		this.state.houses = this.updateHouses(this.state)
		this.state.buildQueue = this.updateBuildQueue(this.state)
	}

	build(name) {
		const houseIndex = _.findIndex(this.state.houses, h => h.name === name)
		const newHouse = {
			name,
			percent: 0
		}

		this.state.resources.gold -= this.state.houses[houseIndex].cost.gold
		this.state.buildQueue.push(newHouse)

		//this.state.houses[houseIndex].count++
	}

	updateBuildQueue(state) {
		return state.buildQueue
			.map(item => {
				item.percent += BASE_BUILD_SPEED

				return item
			})
			.filter(item => {
				const done = item.percent > 100

				if (done) {
					const houseIndex = _.findIndex(state.houses, h => h.name === item.name)
					this.state.houses[houseIndex].count++
				}

				return !done
			})
	}

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
