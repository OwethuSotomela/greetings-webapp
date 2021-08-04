const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const  {Pool}  = require("pg");
const Greeting = require('./greetings');

const app = express();

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

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/users';

const pool = new Pool({
    connectionString,
    ssl : useSSL
});
const greeting = Greeting(pool);
console.log(pool);

app.get('/', function (req, res) {
    res.render('index')
})

app.post('/greetings', async function (req, res) {
    let hello = req.body.itemType;
    let string = req.body.fname;
    if(hello == undefined && string == ""){
        req.flash('info', 'Please enter a valid name and select a language!')
    }
    else if (hello == undefined) {
        req.flash('info', 'Please select a language!');
    }else if (string == "") {
        req.flash('info', 'Please enter a valid name!')
    } else {
        greeting.greetMessage(hello, string);
        await greeting.poolName(string);
    };
    res.render('index', { greetMe: greeting.getGreet() });
})

app.get("/greeted", (req, res) => {
    const sql = "SELECT * FROM Users ORDER BY username"
    pool.query(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("greeted", { model: result.rows });
      console.log(result.rows);
    });
  });

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

