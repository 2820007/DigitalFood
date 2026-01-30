const express=require("express")
const { connectDb } = require("./database/database")
const authRoute=require("./routes/authRoute")
const productRoute=require("./routes/productRoute")
const app=express()

require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


// database connection
connectDb()





//apis ends pint

app.use("/api",authRoute)
app.use("/api",productRoute)


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"I am alive"
    })
})




const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})