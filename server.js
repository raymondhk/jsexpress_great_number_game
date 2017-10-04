var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser');
var app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:'thisissecret'}))

app.get('/', function(req, res){
    console.log(req.session.num)    
    if(!req.session.num){
        req.session.num = Math.floor(Math.random()*100)
    }
    console.log(req.session.guess)
    console.log(req.session.num)
    res.render('index', {request: {guess: req.session.guess, num: req.session.num}})
})

app.post('/guess', (req, res) => {
    req.session.guess = req.body.guess
    res.redirect('/')
})

app.get('/reset', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.use(express.static(__dirname + "/static"))
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.listen(8000, function(){
    console.log('listening on port 8000')
})