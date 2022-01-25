//Require express
const express = require('express');
// Use express
const app = express();
const cookieParser = require('cookie-parser');
//set the view engine
app.set('view engine' , 'ejs');
// set the view directory structure
app.set('views' , './views');

const db = require('./config/mongoose');
//Requiring the layouts library 
const expressLayouts = require('express-ejs-layouts');



app.use(cookieParser());
app.use(express.urlencoded());

//use assets
app.use(express.static('./assets'));
// use the library
app.use(expressLayouts);

//set the scripts and styles of the subpages using express layouts

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Use routes  
app.use('/' , require('./routes/index.js'));
// define port 
const port = 8000;
//listening the server
app.listen(port , function(err){
    if(err)
    console.log(`Error in listening from Server ${err}`);
    
    console.log(`Server is running fit and fine ${port}`);
});
