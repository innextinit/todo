const bcrypt = require("bcryptjs")

class passwordMiddleware {
    static hashPassword( password ) {
        return bcrypt.hashSync( password, 15 )
    }

    static compareHash( password, userPW ) {
        return bcrypt.compareSync( password, userPW )
    }
}


module.exports = passwordMiddleware