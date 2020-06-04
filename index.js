const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  

const { Client } = require('pg'); 
express().get('/db', (req, res) => {
      var dbOpts = {
        connectionString: process.env.DATABASE_URL, 
        ssl : true
      }
    const client = new Client(dbOpts);    
    client.connect();    
    client.query('SELECT id, name, Description__c FROM salesforce.example__c;', (err, dbRes) => {
        if (err) throw err;     

        res.render('pages/db',{
          results : dbRes.rows
        });

        client.end();
      });

    client.end();   
})