
const express = require('express');
const app = express();
const port = 3000;
const v1Router = require('./getShips');



//app.get('/', (req, res, next) =>{
//    res.send('api');

//})

app.use('/api/getShips', v1Router);

app.listen(port, () =>{
    console.log(`Example app listening on port (http://localhost:${port}/api/getShips)`)
})