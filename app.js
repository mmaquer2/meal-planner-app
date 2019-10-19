const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5555;

app.use(cors());
app.use(express.json());


const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    userCreateIndex: true,
    useUnifiedTopology: true

};

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Set the public folder

app.use(express.static(path.join(__dirname,'public')));

//connection to url for database, create database server connection

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, options);

//
const connection = mongoose.connection;

//check database connection
connection.once('open', function(){
    console.log('Connected to MongoDB');
  });
  
  // Check for DB errors
  connection.on('error', function(err){
    console.log(err);
  });


//state what port the server is runnin
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


//enable pug template system

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

//bring in models

let User = require('./models/user.model')

//home route

app.get('/', function(req, res) {

     User.find(function(err, username){
            if(err){
                console.log(err)
            }else if(username) {

        res.render('index', {
                "users": username

            });
        }
    });

});


// add user route

app.get('/users/add',function(req,res){
    res.render('login'), {
        title: 'Add Users' 
    }
});


//app Submit post route

app.post('/users/add', function(req, res){
    let name = new User();
    name.username =req.body.username;

    name.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else {
            res.redirect('/')
        }

    });
   
});

//test for post requets
//console.log('submitted');
//return;

    












