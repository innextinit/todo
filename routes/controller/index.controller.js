const User = require("../../database/models/index.model")
const auth = require("../middleware/auth.middleware")
const passAuth = require("../middleware/password.middleware")

class controller {
    static newUser(req, res, next) {
        let { firstName, lastName, password, email } = req.body

        try {
            if (!firstName || !lastName || !email || !password) {
              const err = new Error()
              err.name = "Bad Request"
              err.status = 400
              err.message = "Please fill all details"
              throw err
            }
    
            const foundUser = User.findOne({"email": email})
    
            if (foundUser) {
                const err = new Error()
                err.name = "Not Acceptable"
                err.status = 406
                err.message = "This user already exit"
                throw err
            }
            
            password = passAuth.hashPassword( password )
            const createUser = 
                ({
                    firstName,
                    lastName,
                    password,
                    email
                })
            const user = new User(createUser)
            user.save()
    
            const userJson = auth.authJSON(user)
            res.status(201).json({
                success: true,
                status: 201,
                message: "User created successfully",
                user: userJson
            })
    
        } catch (error) {
            next(error)
        }
    }

    static login(req, res, next) {
        const { email, password } = req.body
  
        try {
          if (!email || !password) {
            const err = new Error()
            err.name = "Bad Request"
            err.status = 400
            err.message = "Please input all details"
            throw err
          }
    
          const user = User.findOne({"email": email})
          
          if (!user) {
            const err = new Error()
            err.name = "Authentication Error"
            err.status = 401
            err.message = "This user doesn't exist"
            throw err
          }
          
          const userPW = user.password
          const isMatch = passAuth.compareHash(password, userPW)
          
          if (!isMatch) {
            const err = new Error()
            err.name = "Authentication Error"
            err.status = 401
            err.message = "Passowrd Incorrect"
            throw err
          }
          
          const userJson = auth.authJSON(user)
          res.json({
            success: true,
            user: userJson
          })
    
        } catch (error) {
          next(error);
        }
    }

    static userUpdate(req, res, next) {
        try {
            let { firstName, lastName} = req.body
            const update =  User.findByIdAndUpdate(
                user._id,
                {
                    firstName, lastName
                },
                {
                    upsert: true,
                    new: true
                }
            )
            res.json(update)
        } catch (error) {
            next(error)
        }
    }

    static delUser(req, res, next) {
        const user = req.user
        try {
            if (!user) {
                const err = new Error()
                err.name = "Not Acceptable"
                err.status = 406
                err.message = "Could not find the User"
                throw err
            }
    
            const del =  User.findByIdAndDelete(user._id)
            res.json(del)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = controller