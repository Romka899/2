import express from 'express';
import * as fs from "fs";

const app = express();
const port = 3000;
//const v1Router = require('./getShips/index');




app.get('/api/getShips', (req, res, next) =>{
    fs.readFile('ships.json', (err, data) =>{
        const b = JSON.parse(data);
        res.send(b);
        return res;
    })
});

app.listen(port, () =>{
    console.log(`Example app listening on port (http://localhost:${port}/api/getShips)`)
})

//app.use('/api/getShips', v1Router);

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

