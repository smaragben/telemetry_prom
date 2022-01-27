//environment variables
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//declare libraries used
const auth = require('./authentication.js')

const checkAuthenticated = auth.checkAuthenticated;
const checkNotAuthenticated = auth.checkNotAuthenticated;
const express = require('express')
const app = express()
const http = require('http').Server(app)
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
var io = require('socket.io')(http)
const initializePassport = require('./passport-config')
const { prototype } = require('stream')
const data = require('./data.js')

data.datacsv()


  //Authentication and declaration of pages code


  initializePassport(
      passport,
      name => users.find( user => user.name == name),
      id => users.find(user => user.id === id)
  )

  const users = []
  users.push({
      id: Date.now().toString(),
      name: "prom",
      password: "1234"
  })

  //template setup as ejs
  app.set('view-engine', 'ejs')
  app.use(express.static(__dirname + '/public'));
  app.use(express.urlencoded({extended:false})) //declare that we want to use the variebles from the login.ejs, loginfail.ejs in the req variablebelow at the app.post fuctions
  app.use(flash())//flash mesages for wrong username, password etc
  app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized : false
  }))
  app.use(passport.initialize())
  app.use(passport.session())//store and persist our user across many pages
//  app.use(methodOverride('_method'))

  //route setup for homepage
  app.get('/', checkAuthenticated, (req, res) =>{
      res.render('index.ejs')
  })

  //route setup for login page
  app.get('/login', checkNotAuthenticated, (req, res) => {
      res.render('login.ejs')
  })

  app.get('/loginfail', checkNotAuthenticated, (req, res) => {
      res.render('loginfail.ejs')
  })

  app.get('/terminal', checkAuthenticated, (req, res) =>{
      res.render('terminal.ejs')
  })
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
      successRedirect: '/',
      failureFlash: true,
      failureRedirect: '/loginfail'
  })) //this is where the login.ejs form posts the results

  app.post('/loginfail', checkNotAuthenticated, passport.authenticate('local', {
      successRedirect: '/',
      failureFlash: true,
      failureRedirect: '/loginfail'
  }))

  app.delete('/logout', (req,res) => {
      req.logOut()
      res.redirect('/login')

  })

  http.listen(8000, function(){
  })
