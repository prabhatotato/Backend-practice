const express = require('express')
const app = express()
const path = require('path')
const fs  = require('fs');
const { log } = require('console');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res)=>{
    fs.readdir('./files', function(err, files){
        console.log(files);
        res.render('index', {files: files})
    })
})

app.get('/file/edit/:filename', (req, res)=>{
    // console.log(req.params);
    
    res.render('edit', {filename: req.params.filename})
})

app.get('/file/:filename', (req, res)=>{
    // console.log(req.params);
    
    fs.readFile(`./files/${req.params.filename}`, 'utf-8',function(err, filedata){
        console.log(filedata);
        res.render('show', {filedata: filedata, filename: req.params.filename})
        
    })
})

app.post('/edit', (req, res)=>{
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){

        res.redirect('/')
    })
})

app.post('/create', (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect('/')
    })
})
app.listen(3000)