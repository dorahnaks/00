import React from 'react';
import PropTypes from 'prop-types';

const HealthTipCard = React.memo(({ title, description, icon, color, onClick }) => {
  return (
    <article 
      className="health-tip-card" 
      onClick={onClick}
      tabIndex="0"
      aria-label={`Health tip about ${title}`}
      style={{ backgroundColor: `${color}10` }}
    >
      <div className="tip-icon">{icon}</div>
      <div className="tip-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
});

HealthTipCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default HealthTipCard;