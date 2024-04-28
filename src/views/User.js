
import React from "react";
import { useState,useEffect } from "react";
import buildingData from 'D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json';
import axios from "axios";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
function User() {
  const [buildings, setBuildings] = useState([]);
  
  
  const [parks, setParks] = useState(0);
  const [residences, setResidences] = useState(0);
  const [industries, setIndustries] = useState(0);
  const [powerGrids, setPowerGrids] = useState(0);
  const [commercials, setCommercials] = useState(0);
  const [roads, setRoads] = useState(0);
  const [arr,setArr] = useState([]);
  const [cnt1,setCnt]=useState(0);
  const [cnt2,setCnt2]=useState(0);
  const [cnt3,setCnt3]=useState(0);
  const [traffic,setTraffic]=useState(0);
  
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
    console.log(newResidences, newIndustries, newCommercials, newPowerGrids, newRoads);
  }, [buildingData]);
  
  useEffect(() => {
    setParks(256 - residences - commercials - industries - powerGrids - roads);
  }, [residences, commercials, industries, powerGrids, roads, buildingData]);
  


//graph.js
   
    let paths=[];
    useEffect(()=>{
      let map= {"residential": 0, "industrial": 1, "commercial": 2, "power-plant": 3, "road": 4, "tree": 5, "power-line": 6 }
                                                                                          
     const arr=Array.from({length: 16}, () => Array.from({length: 16}, () => 5));
    
      buildings.forEach(building => {
          const {x, y, buildingType} = building;
          if (x < 16 && y < 16) {
              arr[x][y] = map[buildingType];
          }
     
      });
    
      setArr(arr);
      //console.log(arr);
    },[buildings]);
    console.log(arr);

    const handleTraffic = async () => {
      console.log(residences,commercials,industries,roads,parks);
  
      const inputData = {
        Commercial :commercials,
        Residential :residences,
        Industrial :industries,
        Connections_CR : cnt1,
        Connections_IR : cnt3,
        Connections_IC : 10
    
      };
  
      try {
        const response = await axios.post('http://127.0.0.1:5000/predict', inputData);
        setTraffic(response.data.predicted_traffic_volume_scaled);
        console.log("traffic",traffic);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  


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
  let visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let paths = [];
  let path = [[start_row, start_col]];

  dfs(grid, visited, start_row, start_col, path, paths,dest);

  return paths;
}

function bfs(grid,source,dest){
  //let count = 0; // Reset count to 0 at the beginning of the function
   let cnt=0;
  for(let i=0;i<grid.length;i++){
  for(let j=0;j<grid[0].length;j++){
      if(grid[i][j]==source){
           paths=findPaths(grid, i, j,dest);
         // count+=paths.length;
          console.log("path legth",paths.length);
          cnt+=paths.length;
      }
      
  }
}
  return cnt;
}

useEffect(()=>{
  handleTraffic();
})
useEffect(()=>{
    const k = bfs(arr,0,1);
    setCnt(k);
});
// useEffect(()=>{
//     const k2 = bfs(arr,2,1);
//     setCnt2(k2);
// });
useEffect(()=>{
    const k3 = bfs(arr,0,2);
    setCnt3(k3);
});
  console.log(residences, commercials, industries, powerGrids, roads);
  function ProgressMeter1({ progress ,size }) {
    const meterSize = size || 100;
    return (
      <div style={{position: 'relative', width: meterSize, height: meterSize, margin: '0 auto' }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={{
            root: { width: meterSize, height: meterSize },
            path: { stroke: `#FF0000` },
            trail: { stroke: '#ddd' }, // Grey background color for leftover path
            text: { fill: ``, fontSize: `${meterSize * 0.125}px`, dominantBaseline: 'middle', textAnchor: 'middle'},
          }}
        />
      </div>
    );
  }
  return (
    <>
      <div className="content">
       {/* <p>Number of connecting roads between residential and commercial : {cnt1}</p>
       <p>Number of connecting roads between residential and Industry : {cnt3}</p>

       <p>Number of connecting roads between Industrial and commercial : {1}</p>
      <p>Traffic Volume : {Math.round(traffic)}</p>
       */}

<Row>
          <Col md="12">
            <Card>
            
          
               
              <CardHeader>
                <CardTitle tag="h4">Traffic Metric</CardTitle>
                
             <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 20 }}>
               <ProgressMeter1 progress={Math.floor(traffic)} size={250} />
             
           
         
     </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Source </th>
                      <th>Destination</th>
                      <th>Number</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Residential</td>
                      <td>Industrial</td>
                      <td>{cnt1}</td>

                    </tr>
                    <tr>
                      <td>Residential</td>
                      <td>Commercial</td>
                      <td>{cnt3}</td>

                    </tr>
                    <tr>
                      <td>Industrial</td>
                      <td>Commercial</td>
                      <td>1</td>

                    </tr>
                   
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
