
import '../styles/HealthTips.css';
import HealthTipCard from '../components/HealthTipCard';

const HealthTips = () => {
  const healthTips = [
    {
      title: 'Citrus fruits',
      description: 'Orange & Orange Juice: Boosts immunity, energizes, supports skin health'
    },
    {
      title: 'Lemon & lemon Water',
      description: 'Aids digestion, detoxifies, hydrates'
    },
    {
      title: 'Tangerine',
      description: 'Rich in antioxidants, enhances iron absorption'
    },
    {
      title: 'Tropical fruit',
      description: 'Mango: Boosts immunity & skin health'
    },
    {
      title: 'Banana',
      description: 'Energizing, rich in potassium'
    },
    {
      title: 'Strawberries',
      description: 'Good for skin & heart'
    },
    {
      title: 'Blueberries',
      description: 'Boost brain & memory'
    },
    {
      title: 'Raspberries',
      description: 'High fibre, balances blood sugar'
    },
    {
      title: 'Watermelon',
      description: 'Great for hydration, supports kidney function'
    },
    {
      title: 'Watermelon Juice',
      description: 'Cooling and detoxifying'
    },
    {
      title: 'Grapes',
      description: 'High in antioxidants, improve circulation and brain function'
    },
    {
      title: 'Grape Juice',
      description: 'Supports heart health, reduces inflammation, energizes'
    }
  ];

  return (
    <div className="health-tips">
      <h1>Juicy Wellness</h1>
      <p>Discover how adding fruits and fresh juices to your diet can boost immunity and overall well-being</p>
      
      <div className="tips-grid">
        {healthTips.map((tip, index) => (
          <HealthTipCard 
            key={index} 
            title={tip.title} 
            description={tip.description} 
          />
        ))}
      </div>
      
      <div className="quick-tips">
        <h2>Quick Tips</h2>
        <div className="tips-container">
          <div className="tip">
            <h3>Tropical fruits</h3>
            <p>Enjoy a slice of pineapple after a meal to aid digestion</p>
          </div>
          <div className="tip">
            <h3>Citrus fruits</h3>
            <p>Add fresh lemon juice into your water for a refreshing and hydrating drink</p>
          </div>
          <div className="tip">
            <h3>Apples & Pears</h3>
            <p>Eat them with the skin on for maximum fiber and digestive benefits</p>
          </div>
          <div className="tip">
            <h3>Grapes</h3>
            <p>Freeze grapes for a fun, antioxidant-packed snack - great in summer!</p>
          </div>
          <div className="tip">
            <h3>Berry Fruits</h3>
            <p>Top your oatmeal with blueberries or strawberries to boost antioxidants and support brain health</p>
          </div>
          <div className="tip">
            <h3>Pineapple</h3>
            <p>Drink fresh pineapple juice after meals to aid digestion with bromelain enzyme</p>
          </div>
          <div className="tip">
            <h3>Stone Fruits (e.g., mango, peach)</h3>
            <p>Add slices to yogurt or salad for a sweet nutrient boost and skin-friendly vitamins</p>
          </div>
          <div className="tip">
            <h3>Hydrating Fruits</h3>
            <p>Snack on watermelon after workouts to rehydrate and reduce muscle soreness naturally</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;