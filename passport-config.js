const localStrategy = require('passport-local')
.Strategy
const bcrypt = require('bcrypt')  //always async


function intialize(passport,getUserByEmail){
    const authenticateUser = async (email,password,done) => {
        const user = getUserByEmail(email) //returns a user by email
        if(user == null) {
            return done(null, false, { message:'No user with that email'}) //function needed o call every time done
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null,user) //password has matched to user password
            } else {
                return done(null,false,{ message:'Password Incorrect' })
            }
        }   catch (e) {
            return done(e)
        }
    }
 passport.use(new localStrategy({ usernameField: 'email'}, 
 authenticateUser))
 passport.serializeUser((user,done) => done(user.id))
 passport.deserializeUser((id,done) => { 
     return done(null,getUserById(id))
 })
}

module.exports = intialize