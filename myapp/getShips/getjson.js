import HttpsProxyAgent from "https-proxy-agent";
import fetch, { blobFrom } from "node-fetch";
import * as fs from "fs";

let url = 'https://swapi.dev/api/starships';
let all =[];
let su = [];

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

  fs.writeFileSync('ships.json', JSON.stringify(all));
  return all;

}

async function ships(url){
    const response = await fetch(url,{
      agent: new HttpsProxyAgent('http://proxy.compassplus.ru:3128')
    });
    const {results} = await response.json();

    return results;
  }

  console.log(await conc(url));