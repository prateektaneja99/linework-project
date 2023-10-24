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

interface StoreRowProps {
  store: Store;
  refetchData: (data: number) => void;
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
            <a onClick={() => handleStatus(rowData, setRowData)}>
              {`Set as ${rowData.storeStatus != "Draft" ? "Draft" : "Active"}`}
            </a>
            <a onClick={() => handleVisibility(rowData, setRowData, openModal)}>
              {rowData.storeStatus != "Invisible"
                ? "Temporary Invisible"
                : "Set as Active"}
            </a>
            {isModalOpen && (
              <Calendar
                closeModal={closeModal}
                rowData={rowData}
                setRowData={setRowData}
              />
            )}
            <a onClick={() => handleDeleteStore()}>Close this store</a>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default StoreRow;
