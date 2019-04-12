const express = require('express');
const router = express.Router();
const pool = require('./pool.js');

router.get( '/', (req, res) => {
console.log(`in /character GET request`);
pool.query(`SELECT "person"."id", 
            "person"."name" AS "person name",  
            "character"."name" AS "character name" FROM "person"
            JOIN "character" on "person"."fav_char_id" = "character"."id";
           `)
           .then( result => {
               res.send(result.rows); 
           })
           .catch ( error => {
               console.log(`Couldn't get data`, error);
               alert(`Couldn't get data! Try again later`);
               res.sendStatus(500); 
           })

});

module.exports = router; 