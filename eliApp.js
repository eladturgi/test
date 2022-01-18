const express = require('express')
const app = express()
const port = 3000;

const users = [
    {name: "Ben", age: 40, course: "QA" },
    {name: "Vic", age: 23, course: "Fullstack" },
    {name: "Tali", age: 31, course: "Devops" },
]

const lidim = [{name: "Ben", phone: 4000, course: "QA" }]

function checkLidInfo(name) {
    return name.length >= 2;
}

// midelwares 
app.use(express.urlencoded({extended:false}))
app.use('/', express.static("public"))


app.use('/', function(req, res, next){
    console.log("root")
    next()
})

app.use('/about', function(req, res, next){
    console.log("log", Date.now())
    next()
})

app.use('/about', function(req, res, next){
    console.log(req.method)
    // res.send("End middelware")
    next()
})


// get and post 
app.get('/', (req, res) => res.sendFile(__dirname + "/views/homepage.html"))

app.get('/about', (req, res) => {
    console.log("about")
    res.write("<h1>About</h1>")
    res.write("<p>Learn higtech courses</p>")
    res.write("<p>FullStack Gaming, QA, devops</p>")
    res.send()
})
app.get('/users', (req, res) => res.send(users))

app.get('/lidim', (req, res) => res.send(lidim))

app.get('/lidim/:name', (req, res) => {
    let lidName = req.params.name;
    let lid = lidim.find(item => item.name == lidName)
    if(lid) {
        res.send(`call to ${lid.phone}, about course ${lid.course}`)
    } else {
        res.status(404).send(`${req.params.name} Not Found!`)
    }
})
app.get('/reg', (req, res) => res.sendFile(__dirname + '/views/reg.html'))

app.post('/new-lid', (req, res)=>{
    let name = req.body.name;
    let course = req.body.course;
    let phone = req.body.phone;

    let valid = checkLidInfo(name)
    if(valid) {
        lidim.push({name: name, course: course, phone: phone})
        res.send(`Got your info, we will call you ${name}`)
    } else {
        res.send(`Please verify your details`)
    }
})


app.listen(port, ()=>{console.log(`Server live on port ${port}`)})

