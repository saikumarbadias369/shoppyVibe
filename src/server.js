const app=require("..")
const connectDb =require('./config/db')
require('dotenv').config()

app.listen(process.env.PORT,async()=>{
    await connectDb();
    console.log("sai's server running on PORT: ",process.env.PORT)
})
