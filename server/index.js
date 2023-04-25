const express = require("express");
const app = express()
const PORT = 5000;
const mysql = require('mysql');
const bodyParser=require("body-parser");
var cors = require('cors')
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vehicle"
});

app.post('/vehicletype', (req, res) => {

  const numberOfWheels= req.body.noofwheels;
  con.query("SELECT * FROM vehicle_list WHERE wheel_type=?", [numberOfWheels], function (err, result, fields) {
    if (err) throw err;
    /* console.log(result); */
    res.send(result);
  });

})
app.post('/vehiclemodeltype', (req, res) => {

  const selectedvehicle= req.body.selectedvehicle;
  con.query("SELECT Model FROM vehicle_list WHERE Name=?", [selectedvehicle], function (err, result, fields) {
    if (err) throw err;
    /* console.log(result); */
    res.send(result);
  });

})
app.get("/", (req, res) => {
  res.send("hello from express js server");
})
app.listen(PORT, () => {
  console.log(`Server is running on ＄{PORT}`)
})
