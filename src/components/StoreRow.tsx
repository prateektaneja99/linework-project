"use client";
import { SetStateAction, useState } from "react";
import "@/app/globals.css";

// import Modal from "react-modal";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface Store {
  storeID: number;
  storeName: string;
  storeStatus: "Active" | "Draft" | "Invisible";
  productCount: number;
}

interface StoreRowProps {
  store: Store;
  refetchData: (data : number)=>void;
}

const StoreRow: React.FC<StoreRowProps> = ({ store, refetchData }) => {
  const [rowData, setRowData] = useState({ store });
  const [isModalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      const updatedStore = { ...rowData.store, storeStatus: "Invisible" as "Invisible" };
      const updatedRowData = { store: updatedStore };
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);

      // You can now use the `startDate` and `endDate` in your API call
      // Make your API call here and handle the response
      // ...
      setRowData(updatedRowData);
      // Close the modal
      closeModal();
    } else {
      console.log("Please select both start and end dates before confirming.");
    }
  };

  const handleStatus = () => {
    // Create a copy of the state object
    const updatedStore = { ...rowData.store };

    if (updatedStore.storeStatus !== "Draft") {
      updatedStore.storeStatus = "Draft";
    } else {
      updatedStore.storeStatus = "Active";
    }

    const updatedRowData = { ...rowData, store: updatedStore };

    setRowData(updatedRowData);
  };

  const handleVisibility = () => {
    if (rowData.store.storeStatus === "Invisible") {
      // If it's "Invisible," update it to "Active" and skip opening the modal
      const updatedStore = { ...rowData.store, storeStatus: "Active" as "Active" };
      const updatedRowData = { store: updatedStore };
      setRowData(updatedRowData);
    } else {
      // If the storeStatus is not "Invisible," open the modal
      openModal();
    }
  };

  const handleDeleteStore = () => {
    // Perform the API request to delete the store
    // You'll need to implement the API logic
    refetchData(rowData.store.storeID);
  };

  return (
    <tr className="table-row">
      <td className="table-cell">{rowData.store.storeID}</td>
      <td className="table-cell">{rowData.store.storeName}</td>
      <td>
        <div
          className="table-store-status"
          style={{
            backgroundColor:
              rowData.store.storeStatus === "Active"
                ? "rgba(44, 167, 7, 0.62)"
                : rowData.store.storeStatus === "Draft"
                ? "rgb(237, 181, 27)"
                : rowData.store.storeStatus === "Invisible"
                ? "red"
                : "transparent",
          }}
        >
          {rowData.store.storeStatus}
        </div>
      </td>
      <td className="table-cell">{rowData.store.productCount}</td>
      <td className="table-cell">
        <div className="dropdown">
          <button className="dropbtn">...</button>
          <div className="dropdown-content">
            <a onClick={() => handleStatus()}>
              {`Set as ${
                rowData.store.storeStatus != "Draft" ? "Draft" : "Active"
              }`}
            </a>
            <a onClick={() => handleVisibility()}>
              {rowData.store.storeStatus != "Invisible"
                ? "Temporary Invisible"
                : "Set as Active"}
            </a>
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-dialog">
                  <h2>Visibility Feature</h2>
                  <p>Description about the feature goes here.</p>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    placeholderText="Start Date"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    placeholderText="End Date"
                  />
                  <button
                    onClick={handleConfirm}
                    disabled={!startDate || !endDate}
                  >
                    Confirm
                  </button>
                  <button onClick={closeModal}>Cancel</button>
                </div>
              </div>
            )}
            <a onClick={()=>handleDeleteStore()}>Close this store</a>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default StoreRow;
