const BASE_PRODUCTION = 0.025

export default class House {
	constructor({
		// Internal building id
		name,
		// Display name
		prettyName = 'Add a pretty name please',
		// Initial count of building
		count = 0,
		// Count of building that are producing right now
		working = 0,
		// Resources needed to build this building
		cost = null,
		// Resources Produced each tick
		produces = null,
		// Resources Consumed each tick
		consumes = null,
		// Base Production value each tick
		base = 0,
		// Upgrades
		modifiers = [],
		// Unique buildings can only built once
		unique = false,
		// Population buildings increase your population
		population = 0
	}) {
		this.name = name
		this.prettyName = prettyName
		this.count = count
		this.cost = cost
		this.produces = produces
		this.consumes = consumes
		this.base = base
		this.modifiers = modifiers
		this.unique = unique
		this.population = population
	}

	get productionPerSecond() {
		return this.base * 60 * this.working
	}

	get isProducing() {
		return this.productionPerSecond > 0
	}
}
