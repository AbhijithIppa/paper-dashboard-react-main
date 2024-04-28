

import React from "react";
import buildingData from 'D:/abhijith/MERN/dholakpur_developers/paper-dashboard-react-main/src/db.json';
import { useState,useEffect } from "react";
// react plugin used to create charts
import { Line, Pie,Bar } from "react-chartjs-2";
// reactstrap components
import { evaluate } from "Metrics";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import { Progress } from 'reactstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


function Dashboard() {
  function TableRow({ rowData }) {
    return (
      <tr>
        {rowData.map((data, index) => (
          <td key={index}>{data}</td>
        ))}
      </tr>
    );
  }
  
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

  console.log(buildings);

  console.log(residences,commercials,industries,roads,parks);

  const barChartData = {
    labels:["Houses", "Commercial", "Industries","Roads", "Power Stations", "Greenary"],
    datasets: [
      {
        label: "Data",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [residences,commercials,industries,roads,powerGrids,parks], // Example data for 7 columns
      },
    ],
  };

  const barChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
    barThickness: 20, // Decrease bar width
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Disable maintaining aspect ratio
    legend: {
      display: false, // Hide legend for a cleaner look
    },
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className=" hover-effect card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-home text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Houses</p>
                      <CardTitle tag="p">{residences}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="hover-effect card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-building text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Commercial</p>
                      <CardTitle tag="p">{commercials}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="hover-effect card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-industry text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Industries</p>
                      <CardTitle tag="p">{industries}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="hover-effect card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-road text" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Roads</p>
                      <CardTitle tag="p">{roads}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="hover-effect card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-bolt text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Power Stations</p>
                      <CardTitle tag="p">{powerGrids}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="hover-effect card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-broadcast-tower text" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Base Stations</p>
                      <CardTitle tag="p">{0}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="hover-effect card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-tree text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Greenary</p>
                      <CardTitle tag="p">{parks}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="hover-effect">
              <CardHeader>
                <CardTitle tag="h5">Bar Graph </CardTitle>
                <p className="card-category">Details about the city</p>
              </CardHeader>
              <CardBody>
                <Bar
                  data={barChartData}
                  options={barChartOptions}
                  width={600}
                  height={300}
                />
              </CardBody>
              
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          
        </Row>
   */}
    

      </div>
    </>
  );
}


export default Dashboard;
