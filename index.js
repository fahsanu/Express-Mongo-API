const express = require('express')
const routes = require('./routes')
var cors = require('cors')
var path = require('path')
const app = express()
app.use(cors())

app.use((req, res, next) => {
  
    const auth = {login: 'admin', password: 'password'}
  
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  
    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
      // Access granted...
      return next()
    }
  
    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message
  })

app.use(routes)

app.listen(8000, '0.0.0.0', () => {
    console.log(`Server started at ${8000}`)
});