import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import buildingData from 'D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json';
import {useState,useEffect} from 'react';
import axios from 'axios';
const Speedometer = () => {

  const value = 400;
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

  // Function to evaluate building types and calculate counts
  useEffect(() => {
    buildings.forEach(building => {
      switch (building.buildingType) {
        case 'residential':
          setResidences(prevCount => prevCount + 1); // Increment residences count
          break;
        case 'commercial':
          setCommercials(prevCount => prevCount + 1); // Increment commercials count
          break;
        case 'industrial':
          setIndustries(prevCount => prevCount + 1); // Increment industries count
          break;
        case 'power-plant':
          setPowerGrids(prevCount => prevCount + 1); // Increment powerGrids count
          break;
        case 'road':
          setRoads(prevCount => prevCount + 1); // Increment roads count
          break;
        
      }
    });
    setTotalPopulation(residences * 50);
    setHospitals(commercials / 2);
    setSchools(commercials - hospitals);
    
    // Calculate waste management
    setWasteManagement(residences * 50 + industries * 150);
  }, [buildings]);

  // Function to evaluate building types
  

    // Calculate waste management


  useEffect(() => {
    // Set buildings state when component mounts
    setBuildings(buildingData);
    setResidences(0); 
    setCommercials(0);
    setIndustries(0);
    setPowerGrids(0);
    setRoads(0);
    setParks(0);
    setTotalPopulation(0);
    setHospitals(0);
    setSchools(0);
    setWasteManagement(0);
  }, []);
  

  // Run evaluation when buildings state changes
  useEffect(() => {
    setParks(256-residences-commercials-industries-powerGrids-roads);
  }, [residences,commercials,industries,powerGrids,roads,buildings]);

  //graph.js
  

  return (
   <div style={{padding:'100px',display:'flex',justifyContent: 'center', alignItems: 'center'}}>
     
      <ReactSpeedometer 
        value={value}
        width={500}
        height={350}
        needleColor="red"
        currentValueText="Current Value: ${value}"
        minValue={0}
        maxValue={500}
        startColor="green"
        segments={5}
        endColor="red"
        fontFamily='Arial'
        ringWidth={70}
        needleTransition="easeElastic"
      />
      <p>traffic Volume</p>
  
   </div>
  );
};

export default Speedometer;