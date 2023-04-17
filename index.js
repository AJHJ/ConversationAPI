const app = require('express')();
//const https = require('https');
const fs = require("fs");
const PORT = 443;
//This is the part responsible for loading the csv file containing the topics
const topics = [];//This is just the array that stores the data from the csv file.
const philosophical = [];


const { parse } = require("csv-parse");
fs.createReadStream("./Topics.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    topics.push(row);
  })
  .on("end", function () {
    console.log("finished loading topics");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

fs.createReadStream("./Philosophical.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    philosophical.push(row);
  })
  .on("end", function () {
    console.log("finished loading phil topics");
  })
  .on("error", function (error) {
    console.log(error.message);
  });


//https
//  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
 //   {
 //     key: fs.readFileSync("key.pem"),
 //     cert: fs.readFileSync("cert.pem"),
 //   },
 //   app
 // )
 // .listen(PORT, () => {
 //   console.log("serever is runing at port som som");
 // });
app.listen(PORT, () => console.log('running on port som som'));

app.get('/', (req,res)=>{
    res.send("Hello from express servor.")
})

app.get('/general', (req, res) => {
  console.log('req was received');
  const random_number = Math.floor(Math.random() * topics.length); 
  res.status(200).send({
    topic: `${topics[random_number]}`
  })            
});

app.get('/philosophical', (req, res) => {
  console.log('req was received');
  const random_number = Math.floor(Math.random() * philosophical.length); 
  res.status(200).send({
    topic: `${philosophical[random_number]}`
  })            
});