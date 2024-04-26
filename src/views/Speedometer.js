import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import buildingData from 'D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json';
import {useState,useEffect} from 'react';
import axios from 'axios';
const Speedometer = () => {

  const value = 400;
  const [buildings, setBuildings] = useState([]);
  const [arr,setArr]=useState([]);
  
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
  const [ans,setAns]=useState(0);
  const [ans2,setAns2]=useState(0);
  const [ans3,setAns3]=useState(0);
  const [cnt2,Setcnt2]=useState(0);
  const [cnt3,Setcnt3]=useState(0);

  const [cnt,Setcnt]=useState(0);
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
   
  
    //console.log(arr);

    //BFS.js
    // Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

function isValidMove(grid, visited, row, col,dest) {
  let rows = grid.length;
  let cols = grid[0].length;
  return (0 <= row && row < rows && 0 <= col && col < cols && !visited[row][col] && (grid[row][col]==4||grid[row][col]==dest));
}

function dfs(grid, visited, row, col, path, paths,dest) {

  if (grid[row][col] == 0) {
      paths.push(path);
      return;
  }
  visited[row][col] = true;

  let moves = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  for (let move of moves) {
      let new_row = row + move[0];
      let new_col = col + move[1];
      if (isValidMove(grid, visited, new_row, new_col,dest)) {
          path.push([new_row, new_col]);
          dfs(grid, visited, new_row, new_col, path, paths,dest);
          path.pop();
      }
  }
}

function findPaths(grid, start_row, start_col,dest) {
  let rows = grid.length;
  let cols = grid[0].length;
  let visited = Array(rows).fill().map(() => Array(cols).fill(false));
  let paths = [];
  let path = [[start_row, start_col]];

  dfs(grid, visited, start_row, start_col, path, paths,dest);

  return paths;
}

function bfs(grid,source,dest){
  //let count = 0; // Reset count to 0 at the beginning of the function

  for(let i=0;i<grid.length;i++){
  for(let j=0;j<grid[0].length;j++){
      if(grid[i][j]==source){
           paths=findPaths(grid, i, j,dest);
         // count+=paths.length;
          Setcnt(cnt => cnt+paths.length);
      }
      
  }
}

// let paths = findPaths(grid, commercial_row, commercial_col);
  
  // console.log("Paths from commercial area to residence:");
  // for (let path of paths) {
  //     for (let point of path) {
  //         console.log("(" + point[0] + ", " + point[1] + ") ");
  //     }
  //     console.log();
  // }
  // console.log(count);
  //return count
}

let paths=[];
useEffect(()=>{
  let map= {"residential": 0, "industrial": 1, "commercial": 2, "power-plant": 3, "road": 4, "tree": 5, "power-line": 6}
                                                                                      
 const arr=Array.from({length: 16}, () => Array.from({length: 16}, () => 5));

  buildings.forEach(building => {
      const {x, y, buildingType} = building;
      if (x < 16 && y < 16) {
          arr[x][y] = map[buildingType];
      }
 
  });

  setArr(arr);
},[buildings])

useEffect(() => {
    console.log(arr);
    bfs(arr, 2, 0); // Assuming bfs and generateGrid functions are defined somewhere
    setAns(cnt);
    console.log("ans", ans); 
 
}, [arr]); 
useEffect(() => {
  setAns(cnt); // Update ans with the latest value of cnt
}, [cnt]);

useEffect(() => {
  console.log(arr);
  bfs(arr, 1, 0); // Assuming bfs and generateGrid functions are defined somewhere
  setAns2(cnt2);
  console.log("ans", ans2); 

}, [arr]); 
useEffect(() => {
setAns2(cnt2); // Update ans with the latest value of cnt
}, [cnt2]);


useEffect(() => {
  console.log(arr);
  bfs(arr, 1, 2); // Assuming bfs and generateGrid functions are defined somewhere
  setAns3(cnt3);
  console.log("ans", ans3); 

}, [arr]); 
useEffect(() => {
setAns3(cnt3); // Update ans with the latest value of cnt
}, [cnt3]);



  
   

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
        <p>"No of COnnec between commercial and residential":{ans}</p>
        <br></br>
        <p>"No of COnnec between industries and residential":{ans2}</p>
        <br/>
        <p>"No of COnnec between commercial and industries":{ans3}</p>


  
   </div>
  );
};

export default Speedometer;