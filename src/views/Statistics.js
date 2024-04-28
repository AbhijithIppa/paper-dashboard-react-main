import React, { useEffect } from "react";
import { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Line, Pie,Bar } from "react-chartjs-2";
import axios from "axios";



function Statistics() {
  let map_dict = {"residential": 0, "industrial": 1, "commercial": 2, "power-plant": 3, "road": 4, "tree": 5, "power-line": 6}
 

  const [xCoordinate, setXCoordinate] = useState(0);
  const [yCoordinate, setYCoordinate] = useState(0);
  const [knn,setKNN]=useState(0);
  const [output,setoutput]=useState('');
  const reverseMapDict = {};

  for (const key in map_dict) {
      const value = map_dict[key];
      reverseMapDict[value] = key;
  }
  
  // Function to get the key for a given value
  function getKeyForValue(value) {
      setoutput(reverseMapDict[value]);
      console.log(output);
  }
  
  const handleXChange = (event) => {
    setXCoordinate(event.target.value);
  };

  const handleYChange = (event) => {
    setYCoordinate(event.target.value);
  };
  const handleknn = async () => {
    console.log(xCoordinate,yCoordinate)
    const inputData = {
      x_cor: xCoordinate,
      y_cor: yCoordinate,
      
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/knn', inputData);
      setKNN(response.data.predicted_building);
      console.log("knn:",knn)
      getKeyForValue(knn);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  
  return (
    <>
      <div className="content">
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        <div>
      <label htmlFor="x-coordinate">X Coordinate:</label>
      <input 
        type="number" 
        id="x-coordinate" 
        name="x-coordinate" 
        placeholder="Enter X coordinate"
        value={xCoordinate}
        onChange={handleXChange}
      />
      
      <label htmlFor="y-coordinate">Y Coordinate:</label>
      <input 
        type="number" 
        id="y-coordinate" 
        name="y-coordinate" 
        placeholder="Enter Y coordinate"
        value={yCoordinate}
        onChange={handleYChange}
      />
      <button style={{marginLeft:5}} onClick={handleknn}>Check</button>
      <p>Best predicted_building to place on given coordinatees : {output}</p>

    </div>
      </div>
    </>
  );
}

export default Statistics;