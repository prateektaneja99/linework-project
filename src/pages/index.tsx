import Link from "next/link";
import ProductCard from "../components/ProductCard";
import "../app/globals.css"
interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
}


export default function Page() {
  const products: Product[] = [
    { id: 1, name: "Prod 1", price: 40, seller: "seller A" },
    { id: 2, name: "Prod 2", price: 20, seller: "seller B" },
    { id: 3, name: "Prod 3", price: 30, seller: "seller C" },
  ];

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

