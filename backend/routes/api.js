var express = require('express');
var router = express.Router();
const DB = require('./db').DB;

router.get('/test', function (req, res, next) {
    res.send('respond with a resource');
});

/* PUT: CREATE Table, Countries */
router.put('/create/countries', function (req, res, next) {
    DB.createTable('Countries', ['name']);
    res.send('Executed Create Table Countries');
});

/* POST: INSERT, API Countries*/
router.post('/insert/countries', function (req, res, next) {
    // res.send('datdddd');
    DB.insertCountry(req.body.name, () => {
        res.send('INSERTED');
    })

    console.log(req.body.name);
});

/* GET Country listing. */
router.get('/countries', function (req, res, next) {

    DB.select('Countries', (err, data) => {
        console.log(data);
        res.send(data)
        // res.send(err)
    })
});

/**
 * Delete Countries
 */
router.delete('/delete', function(req, res, next) {
    DB.deleteAllCountries((data)=>{
        console.log('Deleted');
        res.send('Deleted');
    });
});

module.exports = router;
