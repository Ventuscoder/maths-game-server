const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { model } = require('mongoose')

function initializePassport(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'No user with that username' })
        }

        /* bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password' })
            }
        }) */
        bcrypt.compare(password, user.password).then(res=>{
            if (res) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect password'})
            }
        })
    }
    
    passport.use(new localStrategy(authenticateUser))

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => {
        return done(null, getUserById(user))
    })
}

module.exports = initializePassport