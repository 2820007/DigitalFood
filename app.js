const express=require("express")
const { connectDb } = require("./database/database")
const authRoute=require("./routes/auth/authRoute")
const productRoute=require("./routes/admin/productRoute")
const adminUserRoute=require("./routes/admin/adminUserRoute")
const reviewRoute=require("./routes/user/reviewRoute")
const profileRouter = require("./routes/user/profileRoute")
const cartRouter = require("./routes/user/cartRoute")
const orderRouter = require("./routes/user/orderRoute")
const adminOrderRoute = require("./routes/admin/adminOrderRoute")
const app=express()

require("dotenv").config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))


// database connection
connectDb()





//apis ends pint

app.use("/api",authRoute)
app.use("/api",productRoute)
app.use("/api",adminUserRoute)
app.use("/api",reviewRoute)
app.use("/api",profileRouter)
app.use("/api",cartRouter)
app.use("/api",orderRouter)
app.use("/api",adminOrderRoute)


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"I am alive"
    })
})




const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server has started at PORT ${PORT}`)
})
