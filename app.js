const express = require('express')
const app = express()
const port = 3000 || process.env.PORT

app.use(require('cors')())
app.use(require('body-parser').json())
app.use(require('morgan')('dev'))

app.use('/api/artists', require('./routes/artists.routes'))
app.use('/api/artworks', require('./routes/artworks.routes'))

app.use((req, res, next) => {
  const status = 404
  const message = `Could not ${req.method} ${req.path}.`

  next({ status, message })
})

app.use(({ status=500, message=`Something went wrong` }, req, res, next) => {
  res.status(status).json({ error: message, status })
})

const listener = () => console.log(`Server running on Port ${port}!`)
app.listen(port, listener)
