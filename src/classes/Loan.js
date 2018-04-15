export default class Loan {
	constructor({ name, value, modifier, interest }) {
		this.name = name
		this.value = value
		this.modifier = modifier
		this.interest = interest
		this.taken = false
	}

	get debt() {
		return this.value * this.modifier
	}

	take() {
		this.taken = true
	}

	payback() {
		this.taken = false
	}
}
