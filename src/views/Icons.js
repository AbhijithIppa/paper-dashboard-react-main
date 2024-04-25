import React, { useState } from 'react';
import './Badge.css'; // CSS file for styling and animations

const Icons = () => {
  const [score, setScore] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [badgeType, setBadgeType] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (event) => {
    setScore(event.target.value);
  };

  const toggleBadgePopup = () => {
    setShowBadge(!showBadge);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const classifyBadge = (score) => {
    if (score >= 90) {
      return 'gold';
    } else if (score >= 80) {
      return 'silver';
    } else if (score >= 70) {
      return 'bronze';
    } else {
      return 'none';
    }
  };

  const handleBadgeDisplay = () => {
    const badge = classifyBadge(score);
    setBadgeType(badge);
    setShowPopup(true);
    setShowBadge(true);
  };

  return (
    <div className="badge-container">
      <input
        type="number"
        placeholder="Enter your score"
        value={score}
        onChange={handleInputChange}
      />
      <button onClick={handleBadgeDisplay}>Display Badge</button>
      {showBadge && (
        <div className={`badge ${badgeType}`} onClick={togglePopup}>
          <img
            src={`images/${badgeType}.png`} // Image for the respective badge type
            alt={`${badgeType} badge`}
            className="badge-img"
          />
          <p className="badge-text">{`${badgeType.charAt(0).toUpperCase()}${badgeType.slice(1)} Badge`}</p>
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <p>Congratulations! You won a {badgeType} badge for scoring {score} points.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Icons;
