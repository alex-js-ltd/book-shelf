const { createUserRecod } = require('./user.js')
const { addToIndex, updateIndex, deleteFromIndex } = require('./search.js')

module.exports = {
	createUserRecod,
	addToIndex,
	updateIndex,
	deleteFromIndex,
}
