import express from 'express';
import * as fs from "fs";
import cors from'cors';
import nosql from 'nosql';
import crypto from 'crypto';
import { title } from 'process';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); 


const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('ваш_секрет', 'salt', 32); // Ключ 

// Шифрование
function encrypt(text) {
  const iv = crypto.randomBytes(16); 
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), content: encrypted };
}


// Дешифровка
function decrypt(encrypted) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(encrypted.iv, 'hex')
  );
  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


const db = nosql.load('encryptdb.nosql');
/*
const jsonObj = JSON.parse(fs.readFileSync('ships.json', 'utf8'));


for (let item of jsonObj){
  console.log(item);
  db.insert(encrypt(JSON.stringify(item)));
}
*/

app.get('/api/getShipsByPageENC', (req, res) => {
  db.find().callback((err, result) => {
    if (err) {
      console.error('Ошибка при чтении из БД:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    res.json({
      total: result.length,
      data: result
    });
  });
});

app.post('/api/getShipsByPage', (req, res) => {
  const { currentPage, itemsPerPage } = req.body;
  db.find()
    .callback((err, result) => {
      if (err) {
        console.error('Ошибка при чтении из БД:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      const decryptedData = result.map(item => {
        try {
          return JSON.parse(decrypt(item));
        } catch (e) {
          console.error('Ошибка дешифровки:', e);
          return null;
        }
      }).filter(item => item !== null);
      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = decryptedData.slice(startIndex, endIndex);


      res.json({
        ships: paginatedData,
        totalPages: Math.ceil(decryptedData.length / itemsPerPage),
      });
    });
});

let a = encrypt("AAAAAAAA");
console.log(a);
console.log(decrypt(a));

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}/api/getShipsByPage  http://localhost:${port}/api/getShipsByPageENC`);
});

/*
app.post('/api/getShipsByPage', async (req, res) => {
  const { currentPage, itemsPerPage } = req.body;


  if (currentPage === undefined || itemsPerPage === undefined) {
    return res.status(400).json({ error: 'Параметры currentPage и itemsPerPage обязательны' });
  }

  try {
    const ships = await loadShips();
    const totalPages = Math.ceil(ships.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedShips = ships.slice(startIndex, endIndex);


    res.json({
      ships: paginatedShips,
      totalPages,
    });
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    res.status(500).json({ error: 'Ошибка при загрузке данных' });
  }
});


const loadShips = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(SHIPS_FILE_PATH, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};
*/



/*
app.get('/api/getShipsByPage', (req, res) => {
  fs.readFile(SHIPS_FILE_PATH, 'utf8', (err, data) => {
      if (err) {
          console.error('Ошибка при чтении файла:', err);
          return res.status(500).send('Ошибка при чтении файла');
      }

      try {
          const ships = JSON.parse(data);
          res.json(ships);
      } catch (parseError) {
          console.error('Ошибка при парсинге JSON:', parseError);
          res.status(500).send('Ошибка при обработке данных');
      }
  });
});
*/


/*
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  connectToDatabase();

  app.get('/api/getAllShips', async (req, res) => {
    try {
      const database = client.db('mydatabase'); // Замените на имя вашей базы данных
      const collection = database.collection('ships'); // Замените на имя вашей коллекции
      const ships = await collection.find({}).toArray(); // Получаем все документы из коллекции
      res.json(ships);
    } catch (error) {
      console.error('Error fetching ships:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.get('/api/loadShips', async (req, res) => {
    try {
      // Чтение файла ships.json
      const data = fs.readFileSync('ships.json', 'utf8');
      const ships = JSON.parse(data); // Парсинг JSON
  
      const database = client.db('mydatabase'); // Замените на имя вашей базы данных
      const collection = database.collection('ships'); // Замените на имя вашей коллекции
  
      // Вставка данных в коллекцию
      const result = await collection.insertMany(ships);
      res.json({ message: 'Data loaded successfully', insertedCount: result.insertedCount });
    } catch (error) {
      console.error('Error loading ships:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
*/


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




