"use client";
import { SetStateAction, useState } from "react";
import "@/app/globals.css";
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
  refetchData: (data: number) => void;
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

  const dateConverter = (date: Date) => {
    const newDate = new Date(date);
    const formatedDate = newDate.toISOString().slice(0, 19).replace("T", " ");
    return formatedDate;
  };

  const handleConfirm = async () => {
    if (startDate && endDate) {
      const formatedStart = dateConverter(startDate);
      const formatedEnd = dateConverter(endDate);
      console.log("Start Date:", formatedStart);
      console.log("End Date:", formatedEnd);

      // You can now use the `startDate` and `endDate` in your API call
      // Make your API call here and handle the response
      // ...
      const payLoadData = {
        status: rowData.store.storeStatus,
        start_date: formatedStart,
        end_date: formatedEnd,
        id: rowData.store.storeID,
      };

      fetch(`http://localhost:8080/store/${rowData.store.storeID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type if sending JSON
          // Add any other headers if needed
        },
        body: JSON.stringify(payLoadData), // Serialize the data as JSON
      })
        .then(
          (res) => res.json()
          // if (res.status === 200) {

          //   // const data = res.json();
          //   // console.log(data);

          //   const updatedStore = {
          //     ...rowData.store,
          //     storeStatus: "Invisible" as "Invisible",
          //   };
          //   const updatedRowData = { store: updatedStore };
          //   setRowData(updatedRowData);

          // } else {
          //   throw new Error("Failed to fetch data");
          // }
        )
        .then((data) => {
          //console.log(data);
          const updatedStore = {
            ...rowData.store,
            storeStatus: data.status,
          };
          const updatedRowData = { store: updatedStore };
          setRowData(updatedRowData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Close the modal
      closeModal();
    } else {
      console.log("Please select both start and end dates before confirming.");
    }
  };

  const handleStatus = async () => {
    const payLoadData = {
      status: rowData.store.storeStatus == "Active" ? "Draft" : "Active",
    };
    fetch(`http://localhost:8080/store/${rowData.store.storeID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type if sending JSON
        // Add any other headers if needed
      },
      body: JSON.stringify(payLoadData), // Serialize the data as JSON
    })
      .then((res) => {
        if (res.status === 200) {
          const updatedStore = { ...rowData.store };

          if (updatedStore.storeStatus !== "Draft") {
            updatedStore.storeStatus = "Draft";
          } else {
            updatedStore.storeStatus = "Active";
          }

          const updatedRowData = { ...rowData, store: updatedStore };

          setRowData(updatedRowData);
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleVisibility = () => {
    if (rowData.store.storeStatus === "Invisible") {
      const payloadActiveData = { status: "Active" };
      fetch(`http://localhost:8080/store/${rowData.store.storeID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type if sending JSON
          // Add any other headers if needed
        },
        body: JSON.stringify(payloadActiveData), // Serialize the data as JSON
      })
        .then((res) => {
          if (res.status === 200) {
            const updatedStore = { ...rowData.store };

            updatedStore.storeStatus = "Active";

            const updatedRowData = { ...rowData, store: updatedStore };

            setRowData(updatedRowData);
          } else {
            throw new Error("Failed to fetch data");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // If the storeStatus is not "Invisible," open the modal
      openModal();
    }
  };

  const handleDeleteStore = () => {
    // Perform the API request to delete the store

    refetchData(rowData.store.storeID);

    // You'll need to implement the API logic
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
                  <h2>Set as invisible</h2>
                  <p>
                    Your store will not be shown in search results during the
                    pre-set period. You are still responsible for already
                    confirmed orders.
                  </p>
                  <div className="modal-dates">
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
                  </div>

                  <div className="button-wrapper">
                    <button className="cancel-btn" onClick={closeModal}>
                      Cancel
                    </button>
                    <button
                      className="confirm-btn"
                      onClick={handleConfirm}
                      disabled={!startDate || !endDate}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
            <a onClick={() => handleDeleteStore()}>Close this store</a>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default StoreRow;
