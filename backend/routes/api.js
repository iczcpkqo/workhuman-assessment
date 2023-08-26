var express = require('express');
var router = express.Router();
const DB = require('./db').DB;

router.get('/test', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET: CREATE Table, Countries */
router.get('/create/countries', function (req, res, next) {
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

/* GET API testing. Select All */
router.get('/testing/select', function (req, res, next) {
    // res.send('datdddd');
    DB.select('Countries', (err, data) => {
        if (err) return next(err);
        res.send(data)
    })
    // res.send('xxxaa')

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















// /api/create/table/teet3/hah,dd
/* GET Country listing. */
// router.get('/create/table/:name/:fields', function (req, res, next) {
//     DB.createTable(req.params.name, req.params.fields.split(','));
//     res.send('Executed Create Table' + req.params.name);
// });
//







// router.post('/countries/insert', function(req, res, next) {
//     DB.insert('test_countries', ['name'], [req.body.name], (err, data) => { })
//     console.log(req.body.name);
// });

//// testing
/* GET API testing. Create */
// router.get('/testing/create', function (req, res, next) {
//     // res.send('datdddd');
//     DB.createTable('test_countries', ['name']);
//     res.send('done');
//     // DB.insert('test', ['test_filed_one'], ['thththththone'], () => {
//     // })
//     // DB.select('test', (err, data) => {
//     //     if (err) return next(err);
//     //     res.send(data)
//     // })
//     // res.send('xxxaa')
//
// });
//
/* GET API testing. Insert */
// router.get('/testing/insert', function (req, res, next) {
//     DB.insert('test_countries', ['name'], ['aaaAcdfskj'], () => {
//     })
//     res.send('inserted');
// });
//
// router.post('/testing/insert', function(req, res, next) {
//     // insertDoc(CO_ORDERS, JSON.parse(req.body.data));
//     res.send(req.body.data);
//     // console.log(typeof req.body);
//     console.log(typeof req.body.name);
// });
//
// /* GET API testing. Select All */
// router.get('/testing/select', function (req, res, next) {
//     // res.send('datdddd');
//     DB.select('test_countries', (err, data) => {
//         if (err) return next(err);
//         res.send(data)
//     })
//     // res.send('xxxaa')
//
// });

/* GET API testing. Delete All*/
// router.get('/testing/delete', function (req, res, next) {
//     // res.send('datdddd');
//     DB.deleteAllDataFromTable('test_countries', (err, data)=>{
//         res.send(data)
//     });
//     // DB.select('test', (err, data) => {
//     //     if (err) return next(err);
//     //     res.send(data)
//     // })
//     // res.send('xxxaa')
//
// });

// router.get('/testing/', function (req, res, next) {
    // selectAll(CO_ITEMS).then(data => { res.send(data); });
    // DB.createTable('test', 'test_filed_one');
    // DB.insert('test', ['test_filed_one'], ['thththththone'], () => {
    //
    // })
    // DB.select('test', (err, data) => {
    //     if (err) return next(err);
    //     res.send(data)
    // })
// });

//// testing END

module.exports = router;
