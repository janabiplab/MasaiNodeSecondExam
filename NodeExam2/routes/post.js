const express=require("express")
const fs=require("fs")
const path=require("path")

const database=path.join(__dirname,'../db/DB.json')

// to get all the data from db.json

const getdata=()=>{
    const data=fs.readFileSync(database,"utf-8")
    return JSON.parse(data)
}

const writeData=(data)=>{
    fs.writeFileSync(database,JSON.stringify(data,null,4),'utf-8')
}




const router=express.Router()
//to get all post

router.get("/getpost",(req,res)=>{
    const allposts=getdata()
    if(!allposts){
        res.send("There is no post avaliable")
    }
    res.json(allposts)
})
//create a new post 
router.post('/createpost',(req,res)=>{
    const {content,author}=req.body
   
    if (!content){
        res.send("please input content")
    }
    else if (!author){
        res.send("Please enter author")
    }
    const posts=getdata()
     
    //new post store in a variable

    const newPost={id:Date.now(),content,author}
    posts.push(newPost)
    writeData(posts)
})
//get post by id

router.get("/getpost/:id",(req,res)=>{
    const allposts=getdata()
    const Id=parseInt(req.params.id)
    const post=allposts.find(p=>p.id===Id)
    if(!post){
        res.send(`No post avaliable in this ${Id}`)
    }

    res.json(post)

})

//update the post by id

router.put("/updatepost/:id",(req,res)=>{
    const{content,author}=req.body()
    const allposts=getdata()
    const Id=parseInt(req.params.id)
    const postIndex=allposts.findIndex(p=>p.id===Id)
    if(postIndex===-1){
        res.send(`No post avaliable in this ${Id}`)
    }
    allposts[postIndex]={id:Id,content,author}
    writeData(allposts)
    res.json(allposts[postIndex])

})

// delete the post by id

router.delete("/deletepost/:id",(req,res)=>{
    const allposts=getdata()
    const Id=parseInt(req.params.id)
    const postIndex=allposts.findIndex(p=>p.id===Id)
    if (postIndex===-1){
        res.send(`No post avaliable in this ${Id}`)
    }
    const deletePost=allposts.splice(postIndex,1)
    writeData(allposts)
    res.json(deletePost)
})



module.exports=router