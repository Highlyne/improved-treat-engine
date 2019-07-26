require('dotenv').config();
const { Client } = require('pg');
// Setup Postgres DB details and connect.
const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432
  });

module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("index");
      });
    
    app.get("/getdata", function(req, res){
        var appData;
        client.connect(function(err,conn){ 
             // watch for any connect issues
             if(err){console.log(err)}
             else{
            conn.query(
            'SELECT * FROM houses', function(err, result) {
                if (err == null || result.rowCount>0) {
                    console.log("Success you touched the DB  \nResults:");
                    console.log(result.rows[0].number);
                    appData = result.rows;
                    client.end();
                    res.render("index", {data:appData});
                }
                else if (err != null || result.rowCount == 0) {
                    console.log("you didn't get anything back " + err);
                    }
            }
        );
        
             }
    });
        
    });
     
      

}