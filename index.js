const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const Greeting = require('./greetings');

const app = express();
const greeting = Greeting();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: "add a secret string here",
    resave: false,
    saveUninitialized: true
}));

app.get('/', function (req, res) {
    req.flash('info', 'Welcome');
    res.render('index', {
        title: 'Home'
    })
});

// app.get('/addFlash', function (req, res) {
//     req.flash('info', 'Flash Message Added');
//     res.redirect('/');
// });

app.get('/the-route', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/', {feedback: greeting.getMessage()});
});

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/action', function (req, res) {
    let hello = req.body.itemType;
    let string = req.body.fname;
    greeting.greetMessage(hello, string);
    res.render('index', {greetMe: greeting.getGreet()});
})

// app.get('/greeted', function (req, res) {
//     app.send('', displays a list of usersthat have been greeted)
// })

// app.get('/counter/<USER_NAME>', function(req, res){
//     res.send(a number of times a user is greeted)
// })

app.post('/reset', function (req, res) {
    greeting.emptyList()
    res.redirect('/');
})

const PORT = process.env.PORT || 2020;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
})