import React from 'react';
import '../styles/HealthTipsCard.css'; 

const HealthTipCard = ({ title, description }) => {
  return (
    <div className="health-tip-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HealthTipCard;