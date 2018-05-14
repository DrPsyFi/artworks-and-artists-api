const Artist = require('../models/Artist')
const Controller = require('./_Controller')
const fields = [ 'first_name', 'last_name' ]
const ctrl = new Controller(Artist, fields)

module.exports = ctrl.toRouter()
