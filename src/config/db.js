const mongoose= require("mongoose")
// const dotenv = require("dotenv");
require('dotenv').config()
// const mongooseUrl= ;

const   connectDb=()=>{
    // return mongoose.connect("mongodb+srv://saikumarbadisa122:zEnUzNDISDRlOcKw@cluster0.mlptv36.mongodb.net/?retryWrites=true&w=majority");
    return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },   );
}
module.exports=connectDb