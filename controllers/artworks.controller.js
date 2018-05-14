const Artwork = require('../models/Artwork')
const Controller = require('./_Controller')
const fields = [ 'title', 'year', 'category', 'img_url', 'artist_id' ]
const ctrl = new Controller(Artwork, fields)

module.exports = ctrl.toRouter()
