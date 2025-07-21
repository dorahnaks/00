
import '../styles/Products.css';
import ProductCard from '../components/ProductForm';

const Products = () => {
  return (
    <div className="products">
      <h1>Fresh Fruits and Juices</h1>
      <p>Delivered to your doorstep</p>
      
      <section className="categories">
        <h2>Our Categories</h2>
        
        <div className="category">
          <h3>Fruits</h3>
          <div className="category-items">
            <ProductCard title="Crisp Apples" description="Perfect for snacking" />
            <ProductCard title="Sweet bananas" description="Great for juices" />
            <ProductCard title="Juicy oranges" description="A healthy treat" />
          </div>
        </div>
        
        <div className="category">
          <h3>Juices</h3>
          <div className="category-items">
            <ProductCard title="Orange Juice" description="Freshly squeezed oranges" />
            <ProductCard title="Pineapple Juice" description="Made using the best" />
            <ProductCard title="Beetroot juice" description="Great for your health" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;