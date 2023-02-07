const express = require('express');
const cors = require('cors')
const mysql = require('mysql');
const myconn = require('express-myconnection');
const localidad = require('./routes/route_localidad');
const movimiento = require('./routes/route_movimiento');
const { request } = require('express');

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
app.use(cors())
//routes-------------------------
app.get('/', (req, res)=>{
    res.send('My First API');
})

app.use('/movimiento', movimiento)


app.use('/localidad', localidad);


//server running-----------------------
app.listen(app.get('port'), () =>{
    console.log('runeando in port ', app.get('port'));
})