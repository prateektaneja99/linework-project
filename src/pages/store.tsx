"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../app/globals.css";
import StoreRow from "@/components/StoreRow";

interface Store {
  storeID: number;
  storeName: string;
  storeStatus: "Active" | "Draft" | "Invisible";
  productCount: number;
}

export default function Store() {
  const [storeData, setStoreData] = useState<Store[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/stores")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const relevantStores = data.map((store: any) => {
          return {
            storeID: store.id,
            storeName: store.name,
            storeStatus: store.status,
            productCount: store.product_count,
          };
        });

        setStoreData(relevantStores);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleButtonClick = (storeId: number) => {
    console.log("Button clicked from child component", storeId);
    fetch(`http://localhost:8080/store/${storeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setStoreData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <header className="site-header">
        <h1>Stores Details</h1>
        <Link href="/" className="site-link">
          Switch to User Mode
        </Link>
      </header>

      <div className="table-container">
        <table className="store-table">
          <thead>
            <tr>
              <th className="table-header">Store ID</th>
              <th className="table-header">Store Name</th>
              <th className="table-header">Store Status</th>
              <th className="table-header">Product Count</th>
              <th className="table-header">Properties</th>
            </tr>
          </thead>
          <tbody>
            {storeData.map((store, index) => (
              <StoreRow
                key={index}
                store={store}
                refetchData={handleButtonClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
