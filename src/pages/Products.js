
import '../styles/Products.css';

import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Products = () => {
  return (
    <>
      <Navbar />
      <section className="product-hero">
        <h1>Fresh Fruits and Juices</h1>
        <p>Delivered to your doorstep</p>
        <button>Order now</button>
      </section>

      <section className="categories">
        <h2>Our Categories</h2>

        <h3>Fruits</h3>
        <div className="items">
          <div className="card"><p>Crisp Apples</p><span>Perfect for snacking</span></div>
          <div className="card"><p>Juicy Oranges</p><span>Great for juices</span></div>
          <div className="card"><p>Sweet Bananas</p><span>A healthy treat</span></div>
        </div>

        <h3>Juices</h3>
        <div className="items">
          <div className="card"><p>Orange Juice</p><span>Freshly squeezed oranges</span></div>
          <div className="card"><p>Pineapple Juice</p><span>Made using the best</span></div>
          <div className="card"><p>Beetroot Juice</p><span>Great for your health</span></div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Products;




// const Products = () => {
//   return (
//     <div className="products">
//       <h1>Fresh Fruits and Juices</h1>
//       <p>Delivered to your doorstep</p>
      
//       <section className="categories">
//         <h2>Our Categories</h2>
        
//         <div className="category">
//           <h3>Fruits</h3>
//           <div className="category-items">
//             <ProductCard title="Crisp Apples" description="Perfect for snacking" />
//             <ProductCard title="Sweet bananas" description="Great for juices" />
//             <ProductCard title="Juicy oranges" description="A healthy treat" />
//           </div>
//         </div>
        
//         <div className="category">
//           <h3>Juices</h3>
//           <div className="category-items">
//             <ProductCard title="Orange Juice" description="Freshly squeezed oranges" />
//             <ProductCard title="Pineapple Juice" description="Made using the best" />
//             <ProductCard title="Beetroot juice" description="Great for your health" />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Products;