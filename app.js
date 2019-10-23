const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pug = require('pug');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3737;

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

let Meal = require('./models/food.model')

//home route


// get meals route


/*
app.get('/', function(req, res) {

    Meal.find({},function(err, food){
           if(err){
               console.log(err)
           }else if(Meal) {

       res.render('index', {
               "meal": food

           });
       }
   });

});

*/

//db.collection.find().forEach(<function>)

app.get('/', function (req, res){
    
        res.render('index')
        
    


});


//get caloarie count and meal number from front end

function user_data() {

    const meal_number = ''
    const cal_number = ''

    //run another function and declare variables in the global scope to run get requests 
}


//random grab of meal objects
//function random()

app.post('/mealplan', function( req,res){
        Meal.find(function(err, food){
            if (err){
                console.log(err)
            } else {
                food.forEach(function(i){
                        var a = i.cals
                        

                     res.render('mealplan', {
                        "meal": a
                    });
                })
            }
        })
})



/*

app.get('/users/add',function(req,res){
    res.render('login'), {
        title: 'Add Users' 
    }
});

*/

//test for post requets
//console.log('submitted');
//return;

    












