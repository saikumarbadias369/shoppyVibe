const app=require("./src")
const connectDb =require('./src/config/db')
require('dotenv').config()

app.listen(process.env.PORT,async()=>{
    await connectDb();
    console.log("sai's server running on PORT: ",process.env.PORT)
})

