import express from 'express';
import * as fs from "fs";

const app2 = express();
//const v1Router = require('./ships.json');

/*
router.route('/ships.json').get((req, res) => {
    res.send(`${req.baseUrl}`);
});
*/





app2.get('/', (req, res, next) =>{
    fs.readFile('ships.json', (err, data) =>{
        const b = JSON.parse(data);
        res.send(b);
        return res;
    })
});


/*
router.get('/', (req, res) => {
    res.send('Get all workouts');
});

router.get('/:workoutId', (req, res) => {
    res.send('Get an existing workout');
});

router.post('/', (req, res) => {
    res.send('Create a new workout');
});

router.patch('/:workoutId', (req, res) => {
    res.send('Update an existing workout');
});

router.delete('/:workoutId', (req, res) => {
    res.send('Delete an existing workout');
});

module.exports = router;
*/