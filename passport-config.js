const LocalStrategy = require('passport-local').Strategy// use passport's library function that uses basic usename name configuration

function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser = (name, password, done) => { // the authenticate user
        //returns a user by username
        const user = getUserByUsername(name)
         
        if(user == null) {
            console.log("inserted:" + name);
            return done(null, false, {message: 'no user with than username'})
        }
        try{
            if(password == user.password){
                console.log("user accepted")

                return done(null, user)
            }
            else{
                return done(null, false, { message: 'password incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'name'}, authenticateUser))//initialize parameters username, password is default, and a function to authentuicate
    //session - serializing user
    passport.serializeUser((user, done) => done(null, user.id))
    //opposite
    passport.deserializeUser((id,done)=>{
        return done(null, getUserById(id))
    })
}


module.exports = initialize