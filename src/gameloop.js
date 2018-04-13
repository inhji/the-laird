import Store from './Store'

export const store = new Store()

const gameLoop = () => {
	store.update()
	requestGameLoop()
}

export const requestGameLoop = () => {
	window.requestAnimationFrame(gameLoop)
}
