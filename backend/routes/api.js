var express = require('express');
var router = express.Router();
const DB = require('./db').DB;

/**
 * A test API that responds with a resource.
 */
router.get('/test', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * An API to insert a country into the database.
 *
 * @author Sean
 * @date 24-08-2023
 */
router.post('/countries', function (req, res, next) {
    // res.send('datdddd');
    DB.insertCountry(req.body.name, () => {
        res.send('INSERTED');
    })

    console.log(req.body.name);
});

/**
 * An API to get a list of all countries from the database.
 *
 * @author Sean
 * @date 24-08-2023
 */
router.get('/countries', function (req, res, next) {

    DB.select('Countries', (err, data) => {
        console.log(data);
        res.send(data)
        // res.send(err)
    })
});

/**
 * An API to delete all countries from the database.
 *
 * @author Sean
 * @date 24-08-2023
 */
router.delete('/countries', function(req, res, next) {
    DB.deleteAllCountries((data)=>{
        console.log('Deleted');
        res.send('Deleted');
    });
});

module.exports = router;
