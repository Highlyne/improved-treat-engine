// require('dotenv').config();
const { Client } = require('pg');
// Setup Postgres DB details and connect.
const client = new Client(process.env.DATABASE_URL);

module.exports = function(app){
    app.get("/", function(req, res) {
        res.render("index");
      });
    
    app.get("/pushdata", function(req, res){
        // *** Used to add initial data to create DB *****
        const query = {
            text: 'INSERT INTO houses(number, street, lat, long, treat, trick, description) VALUES($1, $2, $3, $4, $5, $6, $7)',
            values: [334, 'Coble Dr.', 89.077, 67.00, 0, 1, 'This is a description'],
            }

        client.connect(function(err, conn){
            if(err){console.log(err)}
             else{
            conn.query(query, function(err, result) {
                if (err == null || result.rowCount>0) {
                    console.log("Success you touched the DB  \nResults:");
                    console.log(result.rows[0].number);
                    appData = result.rows;
                    client.end();
                    res.render("index", {data:appData});
                }
                else if (err != null) {
                    console.log("you didn't insert anything " + err);
                    }
                })
            }
        })    
        res.render('index')
    })

    app.get("/getdata", function(req, res){
        var appData;
        client.connect(function(err,conn){ 
             // watch for any connect issues
             if(err){console.log(err)}
             else{
            conn.query(
            'SELECT * FROM houses', function(err, result) {
                if (err == null) {
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