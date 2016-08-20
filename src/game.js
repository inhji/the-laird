const Game = {
  update (state) {
    state.ticks = state.ticks + 1
    state.houses = updateHouses(state)
    return state
  }
}

function updateHouses (state) {
  return state.houses.map(house => {
    const houseProduced = calcProduced(house, state.resources)
    if (houseProduced === 0) {
      return house
    }

    for (let type in house.consumes) {
      state.resources[type] -= house.consumes[type] * house.working
    }

    state.resources[house.produces] += houseProduced

    return house
  })
}

function calcModifier (modifiers) {
  if (modifiers.length === 0) {
    return 0
  }

  const sum = modifiers
    .map(m => m.value)
    .reduce((s, val) => {
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
function calcProduced (house, resources) {
  const { base, modifiers, consumes } = house
  const oneHouse = base + calcModifier(modifiers)
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
    if (canProduce(count, consumes, resources)) {
      house.working = count
      return oneHouse * count
    }
    count--
  }

  // if no house can produce, return zer0
  return 0
}

function canProduce (count, consumes, resources) {
  for (let key in consumes) {
    const resource = consumes[key]
    const total = resource * count
    if (total > resources[key]) {
      return false
    }
  }

  return true
}

module.exports = Game
