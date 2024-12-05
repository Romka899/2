const fs = require('fs');


const express = require('express');
const router = express.Router();



router.route('/ships.json').get((req, res) => {
    res.send(`${req.baseUrl}`);
});

module.exports = router;