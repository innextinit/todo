const mongoose = require('mongoose');
const {DATABASE_URL} = process.env

const options = {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
     useFindAndModify: false
};

module.exports = async () => {
     try {
          await mongoose.connect(DATABASE_URL, options)
          console.log(':::> Connected to MongoDB database')
     } catch (error) {
          console.log("<::: Couldn't connect to database ", error)
     }
};