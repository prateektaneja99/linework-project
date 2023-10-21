import Link from "next/link";
// import { GetServerSideProps } from "next";
import "../app/globals.css";
import StoreRow from "@/components/StoreRow";

// export const getServerSideProps: GetServerSideProps = async () => {
//   // Fetch store data from your API or database
//   let data = await fetch('https://catfact.ninja/fact')
//       // .then(response => response.json())
//       // .then(json => console.log(json))
//   const storeData = await data.json();
//   return {
//     props: {
//       storeData,
//     },
//   };
// };

interface Store {
  storeID: number;
  storeName: string;
  storeStatus: "Active" | "Draft" | "Invisible";
  productCount: number;
}

export default function Store() {
  const storeData: Store[] = [
    {
      storeID: 1,
      storeName: "Store A",
      storeStatus: "Active",
      productCount: 5,
    },
    { storeID: 2, storeName: "Store B", storeStatus: "Draft", productCount: 7 },
    {
      storeID: 3,
      storeName: "Store C",
      storeStatus: "Invisible",
      productCount: 3,
    },
  ];

  const handleButtonClick = (storeId: number) => {
    // Perform the action you want when the button is clicked in the child component
    console.log("Button clicked from child component", storeId);
  };

  return (
    <>
      <header className="site-header">
        <h1>Stores Details</h1>
        <Link href="/" className="site-link">
          Switch to User Mode
        </Link>
      </header>
      {/* <h2>{storeData.length}</h2> */}

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
