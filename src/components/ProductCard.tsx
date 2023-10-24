import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
}

// Define a set of props that the ProductCard component expects
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Render the ProductCard component's content
  return (
    <div className="product-card">
      <div className="product-card-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-seller">{product.seller}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
