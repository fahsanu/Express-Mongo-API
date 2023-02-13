const express = require('express')
const routes = require('./routes')
var cors = require('cors')
var path = require('path')
// var privateKey = fs.readFileSync( 'privatekey.pem' );
// var certificate = fs.readFileSync( 'certificate.pem' );

const app = express()
app.use(cors())

app.use(function(req, res, next){
  res.setTimeout(5000, function(){
      console.log('Request has timed out.');
          res.send(408);
      });

  next();
});

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

// https.createServer({
//     key: privateKey,
//     cert: certificate
// }, app)
app.listen(8500, '0.0.0.0', () => {
    console.log(`Server started at ${8500}`)
});