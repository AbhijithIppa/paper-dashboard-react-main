
import './dashboard/Dashboard.css'
import React from "react";
import Speedometer from "./Speedometer";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import buildingData from 'D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json';
import {useState,useEffect} from 'react';
import axios from 'axios';


function Score() {

  const [buildings, setBuildings] = useState([]);
  const [parks,setParks]=useState(0);
  const [residences, setResidences] = useState(0);
  const [industries, setIndustries] = useState(0);
  const [powerGrids, setPowerGrids] = useState(0);
 
  const [commercials, setCommercials] = useState(0);
  const [roads, setRoads] = useState(0);
 
  const [hospitals, setHospitals] = useState(0);
  
  
  
  const [commercialBuildings, setCommercialBuildings] = useState(0);
  const [sustainabilityScore, setSustainabilityScore] = useState(0);

  const [aqi, setAQI] = useState(0);

  const handleAQI = async () => {
    console.log(residences,commercials,industries,roads,parks);

    const inputData = {
      num_industries: industries,
      num_power_houses: powerGrids,
      num_vehicles: roads*10,
      num_commercial_buildings: commercials,
      num_trees: parks
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_air_pollution', inputData);
      setAQI(response.data.predicted_air_pollution);
      console.log("aqi",aqi)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // Update sustainability score when any factor changes

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
   

    // Calculate waste management
  }, [buildings]);
  
  useEffect(() => {
    // Set buildings state when component mounts
    setBuildings(buildingData);
    setResidences(0); 
    setCommercials(0);
    setIndustries(0);
    setPowerGrids(0);
    setRoads(0);
    setParks(0);
  }, []);
  useEffect(()=>{
    handleAQI();
  });
  
  const updateSustainabilityScore = () => {
    // Define weights for each factor
    const weights = {
      industries: -0.2,
      residencies: 0.3,
      powerGrids: -0.3,
      roads: 0.2,
      commercialBuildings: 0.2,
      parks:0.1
    };

    // Calculate total weighted score
    const totalScore = industries * weights.industries +
      residences * weights.residencies +
      powerGrids * weights.powerGrids +
      roads * weights.roads +
      commercialBuildings * weights.commercialBuildings;

    // Normalize the score to range from 1 to 100
    const normalizedScore = Math.round((totalScore / Object.values(weights).reduce((acc, curr) => acc + curr, 0)) * 100);

    // Update sustainability score state
    setSustainabilityScore(normalizedScore);
  };
  

    function ProgressMeter({ progress ,size }) {
        const meterSize = size || 100;
        return (
          <div style={{position: 'relative', width: meterSize, height: meterSize, margin: '0 auto' }}>
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={{
                root: { width: meterSize, height: meterSize },
                path: { stroke: `#007bff` },
                trail: { stroke: '#ddd' }, // Grey background color for leftover path
                text: { fill: `#007bff`, fontSize: `${meterSize * 0.1}px`, dominantBaseline: 'middle', textAnchor: 'middle'},
              }}
            />
          </div>
        );
      }
    
      return (
        <>
          <div className="content">
            <Card className="hover-effect">
              <CardHeader>
                <h5 className="card-title">Progress Meters</h5>
              </CardHeader>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
                 <div>
                 <ProgressMeter progress={Math.floor(aqi)} size={200} />
                <p style={{marginLeft:75,marginTop:15}}>Pollution</p>
                 </div>
                 
                  {/* <ProgressMeter progress={50} size={200} /> */}
                  {/* <ProgressMeter progress={20} size={200} /> */}
                </div>
              </CardBody>
            </Card>
            <div style={{padding:"20px"}}>
              <Card><Speedometer /></Card>
            </div>
            
          </div>
      </>
    );
    }




export default Score;
