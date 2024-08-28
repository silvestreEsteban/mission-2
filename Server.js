const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The backend is functioning!");
});

app.get("/getCarValue/:carModel/:yearofMake", (req, res) => {
  let carModelName = req.params.carModel;
  let yearOfMake = req.params.yearofMake;
  let jsonResult={};
  if(yearOfMake != null){
    if(yearOfMake>=0){
      let carValue=GetCarValue(carModelName, yearOfMake);
      jsonResult={'car_value':carValue}
    }
    else{
      jsonResult={'error':'year of make cannot be negative'}
    }
    
  }

  else{
    jsonResult={'error': 'year  of make is null'}
  }
 
  res.status(200).json(jsonResult);
});

convertTextToNum("model");

function convertTextToNum(carmodel) {
  let alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
  let carTextArray = carmodel.toLowerCase().split("");
  let total = 0;
  for (let i = 0; i < carTextArray.length; i++) {
    total = total + (alphabetArray.indexOf(carTextArray[i]) + 1);
  }
  console.log("convert total", total);
  return total;
}
function getCarValue(carmodel,year){
  let carModelNum = convertTextToNum(carmodel);
  let carValue = carModelNum * 100 + parseInt(year);
  return carValue
}

// Port
const PORT = process.env.PORT;
app
  .listen(PORT, console.log(`It's working at http://localhost:${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });
module.exports = { convertTextToNum,getCarValue };