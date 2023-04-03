require('dotenv').config()

const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcrypt')

const User = require('./user')

async function getUserByUsername(username) {
    let doc = await User.findOne({username})
    return doc
}

async function getUserById(user) {
    let doc = await User.findById(user._id)
    return doc
}

const initializePassport = require('./passport-config')
initializePassport(passport, getUserByUsername, getUserById)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', checkAuth, async (req, res) => {
    let user = await req.user
    res.render('index.ejs', { user })
})

app.get('/register', checkNotAuth, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuth, async (req, res) => {
    bcrypt.hash(req.body.password, 10).then(hash=>{
        const newUser = new User({
            username: req.body.username,
            password: hash,
            totalPoints: 0
        })
        newUser.save()
        res.redirect('/')
    })
})

app.get('/login', checkNotAuth, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/logout', (req, res) => {
    req.logOut(err => err ? console.log(err) : null)
    res.redirect('/login')
})

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000, ()=>console.log('server running on port 3000'))