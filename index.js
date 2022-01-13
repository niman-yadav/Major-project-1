//Require express
const express = require('express');
// Use express
const app = express();
app.set('view engine' , 'ejs');
app.set('views' , '.views');
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
