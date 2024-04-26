
import './dashboard/Dashboard.css'
import React from "react";
import Speedometer from "./Speedometer";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
           
function Score() {

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
                  <ProgressMeter progress={80} size={200} />
                  <ProgressMeter progress={50} size={200} />
                  <ProgressMeter progress={20} size={200} />
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
