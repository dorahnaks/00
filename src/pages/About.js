import React, { useState, useEffect } from 'react';
import '../styles/About.css';
import { FaLeaf, FaHeartbeat, FaAward, FaUsers, FaHandshake } from 'react-icons/fa';

const About = () => {
  const [companyInfo, setCompanyInfo] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/about/company-info'),
      fetch('http://localhost:5000/api/about/team-members'),
      fetch('http://localhost:5000/api/about/stats')
    ])
    .then(responses => Promise.all(responses.map(res => res.json())))
    .then(([infoData, membersData, statsData]) => {
      setCompanyInfo(infoData);
      setTeamMembers(membersData);
      setStats(statsData);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching about data:', error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay">
          <h1>Our Fresh Journey Since 2019</h1>
          <p>Nature's goodness, delivered with passion</p>
        </div>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <div className="section-badge">Our Story</div>
          <h2>From Seed to Sip</h2>
          <p>{companyInfo.story || 'Loading company story...'}</p>
          
          <div className="section-badge">Our Mission</div>
          <h2>Nourishing Communities</h2>
          <p>{companyInfo.mission || 'Loading company mission...'}</p>
          
          <div className="section-badge">Our Values</div>
          <h2>What We Stand For</h2>
          <div className="values-grid">
            {companyInfo.values && companyInfo.values.split(', ').map((value, index) => (
              <div key={index} className="value-item">
                {index === 0 && <FaLeaf className="value-icon" />}
                {index === 1 && <FaHeartbeat className="value-icon" />}
                {index === 2 && <FaAward className="value-icon" />}
                {index === 3 && <FaUsers className="value-icon" />}
                {index === 4 && <FaHandshake className="value-icon" />}
                <div>
                  <h3>{value}</h3>
                  <p>Description for {value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="about-images">
          <div className="image-card">
            <img 
              src="/static/uploads/company/farm.jpg" 
              alt="Our fruit farm" 
              className="about-image"
            />
            <div className="image-caption">
              <h3>Local Partner Farms</h3>
              <p>Working directly with sustainable growers</p>
            </div>
          </div>
          
          <div className="image-card">
            <img 
              src="/static/uploads/company/juice-bar.jpg" 
              alt="Our juice bar" 
              className="about-image"
            />
            <div className="image-caption">
              <h3>Our Flagship Juice Bar</h3>
              <p>Where freshness meets community</p>
            </div>
          </div>
          
          <div className="stats-card">
            {stats.map(stat => (
              <div key={stat.id} className="stat-item">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <div className="section-badge">Our Team</div>
        <h2>Meet the Fruit Lovers</h2>
        <p className="team-intro">Passionate individuals dedicated to bringing you nature's best</p>
        
        <div className="team-grid">
          {teamMembers.map(member => (
            <div key={member.id} className="team-member">
              <div className="member-photo-container">
                <img 
                  src={member.image_url || '/static/uploads/team/default.jpg'} 
                  alt={member.name} 
                  className="team-photo"
                />
                <div className="member-social">
                  {member.linkedin_url && <a href={member.linkedin_url} className="social-link"><i className="fab fa-linkedin-in"></i></a>}
                  {member.twitter_url && <a href={member.twitter_url} className="social-link"><i className="fab fa-twitter"></i></a>}
                </div>
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="cta-section">
        <div className="cta-content">
          <h2>Experience the Fresh Difference</h2>
          <p>Join thousands of satisfied customers who have made our juices and fruits part of their healthy lifestyle since 2019.</p>
          <a href="/products" className="cta-button">Shop Our Products</a>
        </div>
      </div>
    </div>
  );
};

export default About;