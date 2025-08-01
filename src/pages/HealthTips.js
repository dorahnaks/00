import React, { useState, useMemo } from 'react';
import HealthTipCard from '../components/HealthTipCard';
import { healthTipsData, quickTipsData } from '../components/HealthTipsData';
import '../styles/HealthTips.css';

// Available categories for filtering
const CATEGORIES = [
  { id: 'all', name: 'All Fruits', color: '#4CAF50' },
  { id: 'citrus', name: 'Citrus', color: '#FF9800' },
  { id: 'berries', name: 'Berries', color: '#9C27B0' },
  { id: 'tropical', name: 'Tropical', color: '#FF9800' },
  { id: 'hydrating', name: 'Hydrating', color: '#03A9F4' },
  { id: 'other', name: 'Other', color: '#607D8B' }
];

const HealthTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter health tips based on category and search term
  const filteredHealthTips = useMemo(() => {
    return healthTipsData.filter(tip => {
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Filter quick tips based on selected category
  const filteredQuickTips = useMemo(() => {
    if (selectedCategory === 'all') {
      return quickTipsData;
    }
    return quickTipsData.filter(tip => tip.category === selectedCategory);
  }, [selectedCategory]);

  const handleTipClick = (tip) => {
    // Here you could also open a modal or navigate to a detail page
    console.log('Tip clicked:', tip);
  };

  return (
    <div className="health-tips">
      <div className="fruit-pattern"></div>
      
      <div className="content-wrapper">
        <header className="health-tips-header">
          <h1>Juicy Wellness</h1>
          <p>Discover how adding fruits and fresh juices to your diet can boost immunity and overall well-being</p>
          
          <div className="filter-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search health tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search health tips"
              />
            </div>
            
            <div className="category-filters">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={selectedCategory === category.id ? { backgroundColor: category.color } : {}}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </header>
        
        <div className="tips-count">
          Showing {filteredHealthTips.length} tips
        </div>
        
        {filteredHealthTips.length === 0 ? (
          <div className="no-results">
            <p>No health tips found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="tips-container">
            {filteredHealthTips.map(tip => (
              <HealthTipCard 
                key={tip.id} 
                title={tip.title} 
                description={tip.description} 
                icon={tip.icon}
                color={tip.color}
                onClick={() => handleTipClick(tip)}
              />
            ))}
          </div>
        )}
        
        <div className="quick-tips-section">
          <h2>Quick Tips</h2>
          <div className="quick-tips-scroll">
            {filteredQuickTips.map(tip => (
              <div key={tip.id} className="quick-tip" style={{ backgroundColor: `${tip.color}10` }}>
                <div className="quick-tip-icon">{tip.icon}</div>
                <div className="quick-tip-content">
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;