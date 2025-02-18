import express from 'express';
import * as fs from "fs";
import fetch, { blobFrom } from "node-fetch";
import HttpsProxyAgent from "https-proxy-agent";
import cors from'cors';

const app = express();
const port = 3000;
app.use(cors());

app.get('/api/getAllShips', (req, res, next) =>{
    fs.readFile('ships.json', (err, data) =>{
        const b = JSON.parse(data);
        res.send(b);
        return res;
    })
});

/*
app.get('/api/getAllShips', (req, res, next) =>{
    const url = "https://swapi.dev/api/starships";
    let all =[];


    async function conc(url){
    const response = await fetch(url,{
        agent: new HttpsProxyAgent('http://proxy.compassplus.ru:3128')
    });
    const a = await response.json();
    const {next} = a;
    const b =[];
    if(next !== null){
        all.push(...await ships(url));
        return await conc(next);
    }
    all.push(...await ships(url));

    res.send(all);
    return all;

    }

    async function ships(url){
        const response = await fetch(url,{
        agent: new HttpsProxyAgent('http://proxy.compassplus.ru:3128')
        });
        const {results} = await response.json();

        return results;
    }
        //res.send(conc(url));
    (conc(url));
});
*/


//----------------------------------------------------



/*
app.get('/api/getShipsByPage', (req, res, next) =>{
    function readPage() {
        let page;
        page = console.log(`Введите страницу: ${page}`);
        if (page === null || page === '') return null;
      
        return +page;
      }

    console.log(readPage());
    const url = `https://swapi.dev/api/starships/?page=${page}`;
    let all =[];
    

    async function conc(url){
    const response = await fetch(url,{
        agent: new HttpsProxyAgent('http://proxy.compassplus.ru:3128')
    });
    const a = await response.json();
    const {next} = a;
    const b =[];
    if(next !== null){
        all.push(...await ships(url));
        return await conc(next);
    }
    all.push(...await ships(url));

    res.send(all);
    return all;

    }

    async function ships(url){
        const response = await fetch(url,{
        agent: new HttpsProxyAgent('http://proxy.compassplus.ru:3128')
        });
        const {results} = await response.json();

        return results;
    }
        //res.send(conc(url));
    (conc(url));
});
*/

app.listen(port, () =>{
    console.log(`Example app listening on port (http://localhost:${port}/api/getAllShips)`)
})
/*
app.listen(port, () =>{
    console.log(`Example app listening on port (http://localhost:${port}/api/getShipsByPage)`)
})
*/
