const express=require('express')
const app=express()

const post=require("./routes/post")

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("welcome to the blog post")
})
app.use("/",post)
app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000")
})