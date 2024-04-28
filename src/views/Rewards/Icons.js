import React, { useState } from 'react';
import Lottie from 'lottie-react';
import goldAnimation from './gold.json'; // Gold badge animation JSON file
import silverAnimation from './silver.json'; // Silver badge animation JSON file
import bronzeAnimation from './bronze.json'; // Bronze badge animation JSON file
import './Badge.css'; // CSS file for styling
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  
} from "reactstrap";

const Icons = () => {
  const [score, setScore] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [badgeAnimation, setBadgeAnimation] = useState(null);

  const handleInputChange = (event) => {
    setScore(event.target.value);
  };

  const handleBadgeDisplay = () => {
    if (score >70) {
      setBadgeAnimation(goldAnimation);
    } else if (score > 40 && score<=70) {
      setBadgeAnimation(silverAnimation);
    } else if (score <= 40) {
      setBadgeAnimation(bronzeAnimation);
    } else {
      setBadgeAnimation(null);
      return; // No badge for scores below 70
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="badge-container">
      <div className="center-card">
        <Card className="custom-card">
          <CardBody>
            <div className="input-container">
              <input
                type="number"
                placeholder="Enter your score"
                value={score}
                onChange={handleInputChange}
                className="custom-input"
              />
            </div>
            <div className="button-container">
              <button onClick={handleBadgeDisplay} className="custom-button">Display Badge</button>
            </div>
          </CardBody>
        </Card>
        {showPopup && (
              <div className="popup" onClick={closePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                  <span className="close" onClick={closePopup}>
                    &times;
                  </span>
                  {badgeAnimation && (
                    <div className="badge-animation">
                      <Lottie animationData={badgeAnimation} />
                    </div>
                  )}
                  <p>
                    Congratulations! You won a{' '}
                    {score >70
                      ? 'Gold'
                      : score > 40 && score<=70
                      ? 'Silver'
                      : score <= 40
                      ? 'Bronze'
                      : ''}{' '}
                    badge for scoring {score} points.
                  </p>
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default Icons;
