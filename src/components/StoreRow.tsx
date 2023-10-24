"use client";
import { useState } from "react";
import { handleStatus, handleVisibility } from "../utils/helper";
import Calendar from "../components/Calendar";
import "@/app/globals.css";

export interface Store {
  storeID: number;
  storeName: string;
  storeStatus: "Active" | "Draft" | "Invisible";
  productCount: number;
}

// Define a set of props that the StoreRow component expects
interface StoreRowProps {
  store: Store;
  refetchData: (data: number) => void; // A callback function to refetch data when needed
}

const StoreRow: React.FC<StoreRowProps> = ({ store, refetchData }) => {
  const [rowData, setRowData] = useState(store);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDeleteStore = () => {
    refetchData(rowData.storeID);
  };
  // Render a table row for a store with its corresponding information and actions
  return (
    <tr className="table-row">
      <td className="table-cell">{rowData.storeID}</td>
      <td className="table-cell">{rowData.storeName}</td>
      <td>
        <div
          className="table-store-status"
          style={{
            backgroundColor:
              rowData.storeStatus === "Active"
                ? "rgba(44, 167, 7, 0.62)"
                : rowData.storeStatus === "Draft"
                ? "rgb(237, 181, 27)"
                : rowData.storeStatus === "Invisible"
                ? "red"
                : "transparent",
          }}
        >
          {rowData.storeStatus}
        </div>
      </td>
      <td className="table-cell">{rowData.productCount}</td>
      <td className="table-cell">
        <div className="dropdown">
          <button className="dropbtn">...</button>
          <div className="dropdown-content">
            {/* Provide an options to change the Store Status */}
            <a onClick={() => handleStatus(rowData, setRowData)}>
              {`Set as ${rowData.storeStatus != "Draft" ? "Draft" : "Active"}`}
            </a>
            <a onClick={() => handleVisibility(rowData, setRowData, openModal)}>
              {rowData.storeStatus != "Invisible"
                ? "Temporary Invisible"
                : "Set as Active"}
            </a>{" "}
            {/* Offer an option to change Store Visibility */}
            {/* The Calendar component handles date-related actions and displays a calendar interface */}
            {isModalOpen && (
              <Calendar
                closeModal={closeModal}
                rowData={rowData}
                setRowData={setRowData}
              />
            )}
            <a onClick={() => handleDeleteStore()}>Close this store</a>{" "}
            {/* Allow closing the store */}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default StoreRow;
