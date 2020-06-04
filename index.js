const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Client } = require('pg');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('', (req, res) => res.render('pages/index'))


  express().get('/db', (req, res) => {
    debugger  
    var dbOpts = {
          connectionString: "postgres://zweaddlakldcjw:272eb9a08c7d0adc9c8259f92fb0ed60dcd676a5de5e22784dd3fc1a790c0b52@ec2-54-86-170-8.compute-1.amazonaws.com:5432/ddl8hruv7667ae", 
          ssl : true
        }
    const client = new Client(dbOpts);    
     
    client.query('SELECT id, name, Description__c FROM salesforce.Example__c;', (err, dbRes) => {
      debuger
          if (err) throw err;     
    
          res.render('pages/db',{
            results : dbRes.rows
          });
    
          client.end();
        });
    
    client.end();   
  }) 


  express().listen(PORT, () => console.log(`Listening on ${ PORT }`))