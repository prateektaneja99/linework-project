"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import "../app/globals.css";
import StoreRow from "@/components/StoreRow";
import { getStores } from "@/utils/helper";
import { FETCH_API } from "@/utils/constants";

interface Store {
  storeID: number;
  storeName: string;
  storeStatus: "Active" | "Draft" | "Invisible";
  productCount: number;
}

export default function Store() {
  const [storeData, setStoreData] = useState<Store[]>([]);
  useEffect(() => {
    getStores(setStoreData); // Call the getStores function to populate the storeData state
  }, []);

  // Function to handle a button click and delete a store
  const handleButtonClick = (storeId: number) => {
    console.log("Button clicked from child component", storeId);

    // Make a DELETE request to the server to delete the store
    fetch(`${FETCH_API + storeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setStoreData(data)) // Update the store data after deletion
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <header className="site-header">
        <h1>Stores Details</h1>
        {/* Render a link using Next.js's Link component to navigate to the home page */}
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
            {/* Render a list of StoreRow components for each store in the storeData state */}
          </tbody>
        </table>
      </div>
    </>
  );
}
