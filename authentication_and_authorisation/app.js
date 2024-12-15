const express = require('express')
const bcrypt = require('bcrypt')
const app = express()


app.get("/", (req,res) =>{
    bcrypt.genSalt(10, function(req, res){
        console.log(res);  
    })
    res.send("done")
   
})



app.get("/read", (req,res) =>{
   console.log(req.cookies);
   
    res.send("read page")
})



app.listen(3000)

