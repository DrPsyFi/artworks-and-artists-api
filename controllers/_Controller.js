const pluralize = require('pluralize')

class Controller {
  constructor (Resource, fields) {
    this.name = Resource.name.toLowerCase()
    this.resource = new Resource()
    this.fields = fields
  }

  toRouter () {
    return {
      _isValidId: this._isValidId.bind(this),
      _hasAllFields: this._hasAllFields.bind(this),
      _hasAnyFields: this._hasAnyFields.bind(this),
      index: this.index.bind(this),
      show: this.show.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this),
      destroy: this.destroy.bind(this)
    }
  }

  _isValidId (id) {
    return !!this.resource.get(id)
  }

  _hasAllFields (body) {
    const keys = Object.keys(body)

    return this.fields.every(field => keys.includes(field))
  }

  _hasAnyFields (body) {
    const keys = Object.keys(body)

    return this.fields.some(field => keys.includes(field))
  }

  index (req, res, next) {
    res.json({ [pluralize(this.name)]: this.resource.get() })
  }

  show (req, res, next) {
    const id = req.params.id

    res.json({ [this.name]: this.resource.get(id) })
  }

  create (req, res, next) {
    const body = req.body
    if (!this._hasAllFields(body)) return next({ status: 422, message: `Invalid request body` })

    res.status(201).json({ [this.name]: this.resource.create(body) })
  }

  update (req, res, next) {
    const id = req.params.id
    const body = req.body
    if (!this._isValidId(id)) return next({ status: 404, message: `Cannot find ${this.name} with id of ${id}` })
    if (!this._hasAnyFields(body)) return next({ status: 422, message: `Invalid request body` })

    res.json({ [this.name]: this.resource.update(id, req.body) })
  }

  destroy (req, res, next) {
    const id = req.params.id
    if (!this._isValidId(id)) return next({ status: 404, message: `Cannot find ${this.name} with id of ${id}` })

    res.json({ [this.name]: this.resource.destroy(id) })
  }
}

module.exports = Controller
