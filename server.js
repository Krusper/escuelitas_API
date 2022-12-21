const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes');

const app = express();
app.set('port', process.env.PORT || 9000);
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'escuelas',
    database: 'bd_escuelas'
}
//middleware---------------------
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());

//routes-------------------------
app.get('/', (req, res)=>{
    res.send('My First API');
})
app.use('/autoridad', routes);
app.use('/localidad', routes);


//server running-----------------------
app.listen(app.get('port'), () =>{
    console.log('runeando in port ', app.get('port'));
})