"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../app/globals.css";
import { getProducts } from "@/utils/helper";

export interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(setProducts); // Call the getProducts function to populate the products state
  }, []);

  return (
    <>
      <header className="site-header">
        <h1>Product Listing</h1>
        {/* Render a link using Next.js's Link component to navigate to the "store" page */}
        <Link href="/store" className="site-link">
          Switch to Seller Mode
        </Link>
      </header>

      <div>
        <ul className="product-list-container">
          {/* Render a list of ProductCard components for each product in the state */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </>
  );
}
