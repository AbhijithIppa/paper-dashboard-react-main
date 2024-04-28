import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import buildingData from 'D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json';
import {useState,useEffect} from 'react';
import axios from 'axios';
const Speedometer = () => {
  const value=400;
  const [buildings, setBuildings] = useState([]);
  
  
  const [parks, setParks] = useState(0);
  const [residences, setResidences] = useState(0);
  const [industries, setIndustries] = useState(0);
  const [powerGrids, setPowerGrids] = useState(0);
  const [wasteManagement, setWasteManagement] = useState(0);
  const [commercials, setCommercials] = useState(0);
  const [roads, setRoads] = useState(0);
  const [TotalPopulation, setTotalPopulation] = useState(0);
  const [hospitals, setHospitals] = useState(0);
  const [schools, setSchools] = useState(0);
  const [sustainabilityScore, setSustainabilityScore] = useState(0);

  // Function to evaluate building types and calculate counts
  useEffect(() => {
    setBuildings(buildingData);
  
    let newResidences = 0;
    let newCommercials = 0;
    let newIndustries = 0;
    let newPowerGrids = 0;
    let newRoads = 0;
  
    buildingData.forEach(building => {
      switch (building.buildingType) {
        case 'residential':
          newResidences += 1; // Increment residences count
          break;
        case 'commercial':
          newCommercials += 1; // Increment commercials count
          break;
        case 'industrial':
          newIndustries += 1; // Increment industries count
          break;
        case 'power-plant':
          newPowerGrids += 1; // Increment powerGrids count
          break;
        case 'road':
          newRoads += 1; // Increment roads count
          break;
      }
    });
  
    setResidences(newResidences);
    setCommercials(newCommercials);
    setIndustries(newIndustries);
    setPowerGrids(newPowerGrids);
    setRoads(newRoads);
  
    console.log(buildingData);
   // console.log(newResidences, newIndustries, newCommercials, newPowerGrids, newRoads);
  }, [buildingData]);
  
  useEffect(() => {
    setParks(256 - residences - commercials - industries - powerGrids - roads);
    calculateSustainabilityScore(residences,commercials,industries,roads,parks );
  }, [residences, commercials, industries, powerGrids, roads, buildingData]);
  

  console.log(residences,commercials,industries,roads,parks);

  // Update sustainability score when any factor changes
  function calculateSustainabilityScore(residences, commercials, industries, roads, parks) {
    // Define weights for each category
    const weights = {
        residences: 0.2,
        commercials: 0.2,
        industries: 0.2,
        roads: 0.2,
        parks: 0.4
    };
    let totalScore=0;
    // Calculate the total score
     totalScore = (residences * weights.residences) +
                       (commercials * weights.commercials) +
                       (industries * weights.industries) +
                       (roads * weights.roads) +
                       (parks * weights.parks);

    // Scale the total score to be between 0 and 100
    const scaledScore =  Math.round((totalScore / Object.values(weights).reduce((acc, curr) => acc + curr, 0)));

    console.log("susScore",scaledScore);
    // Ensure the score is between 0 and 100
    //return Math.max(0, Math.min(100, scaledScore));
    setSustainabilityScore(scaledScore);
}


  console.log("sus",sustainabilityScore)




  return (
   <div style={{padding:'100px',display:'flex',justifyContent: 'center', alignItems: 'center'}}>
     
      <ReactSpeedometer 
        value={sustainabilityScore}
        width={500}
        height={350}
        needleColor="green"
        currentValueText="Sustanability Score: ${value}"
        minValue={0}
        maxValue={100}
        startColor="red"
        segments={5}
        endColor="green"
        fontFamily='Arial'
        ringWidth={70}
        needleTransition="easeElastic"
      />
        {/* <p>"No of COnnec between commercial and residential":{cnt2}</p>
        <br></br>
        <p>"No of COnnec between industries and residential":{cnt}</p>
        <br/>
        <p>"No of COnnec between commercial and industries":{cnt3}</p> */}


  
   </div>
  );
};

export default Speedometer;