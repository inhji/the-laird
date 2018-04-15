const BASE_PRODUCTION = 0.025

export default class House {
	constructor({
		// Internal building id
		name,
		// Display name
		prettyName = 'Add a pretty name please',
		// Initial count of building
		count = 0,
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
		unique = false
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
	}
}
