import axios from 'axios';
let parks = 0 ,residences = 0,industries = 0,powerGrids = 0,wasteManagement = 0,commercials=0,roads=0;
let TotalPopulation = residences*50, hospitals=commercials/2 , schools=commercials-hospitals;

const emissionsFactor = 0.5;

function getTheData(){
  let dataArray=[];
  axios.get('C:/Users/SAHIL/OneDrive/Desktop/paper-dashboard-react-main/paper-dashboard-react-main/db.json')
  .then(response => {
    // Assuming your file contains an array of objects
     dataArray = response.data;
    // Use the dataArray as needed
    console.log(dataArray);
  })
  .catch(error => {
    console.error('There was a problem fetching the file:', error);
  });

   return dataArray ;
}

export function  evaluate(){
    let dataArray=[];
    
   return dataArray= getTheData();
// Read the contents of data.json synchronously
// const jsonData = fs.readFileSync('C:/Users/SAHIL/OneDrive/Desktop/paper-dashboard-react-main/paper-dashboard-react-main/db.json', 'utf8');

// // Parse the JSON data
// const dataArray = JSON.parse(jsonData);


//  //getTheData();
for(let i=0;i<dataArray.size;i++){ 
    let type = dataArray[i].buildingType;

switch(type) {
  case 'residential':
    residences++;
    break;
  case 'commercial':
    commercials++;
    break;
  case 'industrial':
    industries++;
    break;
  case 'power-plant':
    powerGrids++;
    break;
  case 'road':
    roads++;
}
}
//   parks = 256 - dataArray.size ;
//   wasteManagement = residences*50+industries*150;
 
}

// function calculateSustainabilityMetrics( totalParks, numSchools, numHospitals, totalPopulation) {
//     const greenSpaceRatio = (totalParks / 256) * 100;
//     const educationAccessScore = numSchools / totalPopulation;
//     const healthcareAccessScore = numHospitals / totalPopulation;
    
//     return {
//         greenSpaceRatio,
//         educationAccessScore,
//         healthcareAccessScore
//     };
// }


// function calculateAQI(parks, residences, industries, powerGrids, wasteManagement) {
    
//   const parkWeight = 0.5; 
//   const residenceWeight = 0.2; 
//   const industryWeight = -0.8;
//   const powerGridWeight = -0.6; 
//   const wasteManagementWeight = -0.4; 

//   const compositeScore = (parks * parkWeight) +
//                          (residences * residenceWeight) +
//                          (industries * industryWeight) +
//                          (powerGrids * powerGridWeight)// +
//                          (wasteManagement * wasteManagementWeight);

//   return compositeScore;
// }


// function calculatePollutionMetrics(coalEnergyOutput, wasteManagement) {
//     const co2Emissions = coalEnergyOutput * emissionsFactor;
//    // const wasteManagementEfficiency = (totalWasteManaged / totalWasteGenerated) * 100;
//     const airQualityIndex = calculateAQI(parks,residences,industries,powerGrids,wasteManagement);
//     return {
//         co2Emissions,
//        // wasteManagementEfficiency,
//         airQualityIndex
//     };
// }

// const sustainabilityMetrics = calculateSustainabilityMetrics(256, parks, schools, hospitals, TotalPopulation);

// const pollutionMetrics = calculatePollutionMetrics(powerGrids*100,wasteManagement);
// const sustainabilityMetrics = calculateSustainabilityMetrics(256, 120, schools, hospitals, TotalPopulation);

// const pollutionMetrics = calculatePollutionMetrics(powerGrids*100,wasteManagement);


// console.log("Sustainability Metrics:", sustainabilityMetrics);
// console.log("Pollution Metrics:", pollutionMetrics);