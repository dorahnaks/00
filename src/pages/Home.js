
import '../styles/Home.css';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="hero">
        <h1>Taste the Freshness</h1>
        <p>Discover a wide selection of fresh fruits and delicious juices, crafted with care and bursting with flavour</p>
        <button>Order now</button>
      </section>

      <section className="best-sellers">
        <h2>Best sellers</h2>
        <div className="items">
          <div className="card"><p>Orange Juice</p><span>Made with 100% fresh oranges</span></div>
          <div className="card"><p>Crisp Apples</p><span>Grown locally, full of flavour</span></div>
          <div className="card"><p>Berry Smoothie</p><span>Blend of berries and yoghurt</span></div>
          <div className="card"><p>Tropical Sellers</p><span>A refreshing mix of tropical fruits</span></div>
        </div>
      </section>

      <section className="health-benefits">
        <h2>Health Benefits</h2>
        <div className="benefits-box">
          <div>
            <h4>🍊 Boost Your Immunity</h4>
            <p>Vitamins and antioxidants to support your immune system.</p>
          </div>
          <div>
            <h4>🌿 Natural Goodness</h4>
            <p>No artificial additives or preservatives.</p>
          </div>
          <div>
            <h4>❄️ Energy Boost</h4>
            <p>Refreshing fruits and juices to energize your day.</p>
          </div>
        </div>
      </section>

      <section className="offerings">
        <h2>Explore Our Offerings</h2>
        <p>Discover a wide range of fruits and juices we offer, each with its unique taste and health benefit</p>
        <button>Learn more</button>
      </section>
      <Footer />
    </>
  );
};

export default Home;


// const Home = () => {
//   return (
//     <div className="home">
//       <section className="hero">
//         <h1>Taste the Freshness</h1>
//         <p>Discover a wide selection of fresh fruits and delicious juices, crafted with care and bursting with flavour</p>
//         <button className="btn btn-primary">Order now</button>
//       </section>
      
//       <section className="best-sellers">
//         <h2>Best sellers</h2>
//         <div className="products-grid">
//           <ProductCard title="Orange Juice" description="Crisp Apples" />
//           <ProductCard title="Berry Smoothie" description="Tropical Sellers" />
//           <ProductCard title="Crisp Apples" description="Grown locally, full of flavour" />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;