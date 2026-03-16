const mongoose = require("mongoose")
require("dotenv").config()
const DBCOnnection = ()=>{
    mongoose.connect("mongodb://127process.0env.0.1:27017/egarageDB"MONGO_URI).then(()=>{
    }).catch((e)=>{
        console.log(err)
    })
}
module.exports = DBCOnnection