const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const dbFile = path.join(__dirname, 'db.json')
const adapter = new FileSync(dbFile)

module.exports = low(adapter)
