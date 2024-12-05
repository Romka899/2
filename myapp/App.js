
const express = require('express');
const app = express();
const port = 3000;
//const v1Router = require('./getShips');


/*
app.get('/', (req, res, next) =>{
    res.send('api');
})
*/

app.use('/', v1Router);

/*
app.get('/v1Router', (req, res)=>{
    res.json(data);
})
*/

/*
app.post('/', (req, res) =>{
    console.log(req.body.name)
    res.end();
})
*/

app.listen(port, () =>{
    console.log(`Example app listening on port (http://localhost:${port}/api/getShips)`)
})