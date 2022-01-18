//require the library
const mongoose = require('mongoose');

//connection to the library
mongoose.connect('mongodb://localhost/Codeial_Development_db');

//acquire the connection
const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'error connecting to the db'));

db.once('open' , function(){
    console.log(`Successfully connected to the database`);
});