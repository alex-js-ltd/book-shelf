const search = require('./search')
const user = require('./user')

exports.addToIndex = search.addToIndex
exports.updateIndex = search.updateIndex
exports.deleteFromIndex = search.deleteFromIndex

exports.createUserRecord = user.createUserRecord
