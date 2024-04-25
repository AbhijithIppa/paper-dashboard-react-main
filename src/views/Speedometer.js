import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";


const Speedometer = () => {
  const value = 400;

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
  
   </div>
  );
};

export default Speedometer;