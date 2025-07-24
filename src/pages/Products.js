import { Link } from 'react-router-dom';
import '../styles/Products.css';
import ProductCard from '../components/ProductForm';

import appleImage from '../images/apple_order_page.jpg';
import bananaImage from '../images/b_order_pg.jpg';
import orangeImage from '../images/oranges_pdt_pg.jpg';
import orangeJuiceImage from '../images/orange_juice_home.png';
import pineappleJuiceImage from '../images/jui_order_pg.jpg';
import beetrootJuiceImage from '../images/beetroot juice_order_pg.jpg';

const Products = () => {
  const products = [
    {
      id: 1,
      title: "Crisp Apples",
      description: "Perfect for snacking",
      price: 5000,
      category: "Fruits",
      image: appleImage
    },
    {
      id: 2,
      title: "Sweet Bananas",
      description: "Great for juices",
      price: 3000,
      category: "Fruits",
      image: bananaImage
    },
    {
      id: 3,
      title: "Juicy Oranges",
      description: "A healthy treat",
      price: 4500,
      category: "Fruits",
      image: orangeImage
    },
    {
      id: 4,
      title: "Orange Juice",
      description: "Freshly squeezed oranges",
      price: 7000,
      category: "Juices",
      image: orangeJuiceImage
    },
    {
      id: 5,
      title: "Pineapple Juice",
      description: "Made using the best",
      price: 8000,
      category: "Juices",
      image: pineappleJuiceImage
    },
    {
      id: 6,
      title: "Beetroot Juice",
      description: "Great for your health",
      price: 6500,
      category: "Juices",
      image: beetrootJuiceImage
    }
  ];

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Fresh Fruits and Juices</h1>
        <p>Delivered to your doorstep</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            {...product}
          />
        ))}
      </div>
      
      <div className="products-footer">
        <Link to="/cart" className="btn btn-outline">View Cart</Link>
      </div>
    </div>
  );
};

export default Products;