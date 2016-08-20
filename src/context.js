const context = {
  state: {
    ticks: 0,
    resources: {
      bread: 0,
      crop: 0,
      water: 0,
      wood: 0
    },
    houses: [
      {
        name: 'bakery',
        count: 0,
        produced: 0,
        produces: 'bread',
        working: 0,
        consumes: {
          crop: 1,
          water: 1,
          wood: 0.5
        },
        base: 1,
        modifiers: [
          { name: 'apprentice', lvl: 0, value: 0 }
        ]
      },
      {
        name: 'farm',
        count: 0,
        produced: 0,
        produces: 'crop',
        working: 0,
        consumes: {
          water: 1
        },
        base: 1,
        modifiers: []
      },
      {
        name: 'well',
        count: 0,
        produced: 0,
        produces: 'water',
        working: 0,
        base: 1,
        consumes: null,
        modifiers: []
      },
      {
        name: 'logger',
        count: 0,
        produced: 0,
        produces: 'wood',
        working: 0,
        base: 1,
        consumes: null,
        modifiers: []
      }
    ]
  }
}

module.exports = context
