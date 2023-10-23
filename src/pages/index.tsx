"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../app/globals.css";

interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    console.log("Inside UseEffect");
    fetch("http://localhost:8080/products/Active")
      .then((response) => response.json())
      .then((data) => {
        // Extract relevant fields from the API response
        console.log(data);
        const relevantProducts = data.map((product: any) => {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            seller: product.store_name,
          };
        });

        // Set the products state with the relevant data
        setProducts(relevantProducts);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <>
      <header className="site-header">
        <h1>Product Listing</h1>
        <Link href="/store" className="site-link">
          Switch to Seller Mode
        </Link>
      </header>

      <div>
        <ul className="product-list-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </>
  );
}
