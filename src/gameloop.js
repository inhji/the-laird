import AppStore from './AppStore'

export const store = new AppStore()

const gameLoop = () => {
	store.update()
	requestGameLoop()
}

export const requestGameLoop = () => {
	window.requestAnimationFrame(gameLoop)
}

