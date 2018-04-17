export const capitalize = ([head, ...rest]) => {
	return head.toUpperCase() + rest.join('')
}
