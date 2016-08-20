const Vue = require('vue')
const game = require('./game')
const context = require('./context')

function findByName (collection, name) {
  for (var i = 0; i < collection.length; i++) {
    if (collection[i].name === name) {
      return i
    }
  }
  return -1
}

Vue.filter('round', function (value) {
  return Math.round(value).toString()
})

const vm = new Vue({
  el: '#game',
  template: '#game-template',
  data: context,
  computed: {
    ticks () {
      return this.state.ticks
    },
    bakery () {
      const index = findByName(this.state.houses, 'bakery')
      return this.state.houses[index]
    },
    farm () {
      const index = findByName(this.state.houses, 'farm')
      return this.state.houses[index]
    },
    well () {
      const index = findByName(this.state.houses, 'well')
      return this.state.houses[index]
    },
    houses () {
      return this.state.houses
    },
    resources () {
      return this.state.resources
    }
  },
  methods: {
    build (name) {
      const index = findByName(this.state.houses, name)
      if (index > -1) {
        this.state.houses[index].count++
      }
    }
  }
})

setInterval(() => {
  console.log(context.state)
  context.state = game.update(context.state)
}, 1000)
