const id = require('shortid')
const db = require('../db')

class Model {
  constructor (table) {
    this.table = table
  }

  get (id) {
    const table = db.get(this.table).value()
    return id ? table.find(resource => resource.id === id) : table
  }

  create (body) {
    const resource = { ...body, id: id() }
    const result = db
      .get(this.table)
      .push(resource)
      .write()

    return result[result.length - 1]
  }

  update (id, body) {
    return db
      .get(this.table)
      .find({ id })
      .assign(body)
      .write()
  }

  destroy (id) {
    return db
      .get(this.table)
      .remove({ id })
      .write()[0]
  }
}

module.exports = Model
