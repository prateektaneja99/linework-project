import { Store } from "@/components/StoreRow";

export const handleStatus = async (
  rowData: Store,
  setRowData: React.Dispatch<React.SetStateAction<Store>>
) => {
  const payLoadData = {
    status: rowData.storeStatus == "Active" ? "Draft" : "Active",
  };
  fetch(`http://localhost:8080/store/${rowData.storeID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payLoadData),
  })
    .then((res) => {
      if (res.status === 200) {
        const updatedStore = { ...rowData };

        if (updatedStore.storeStatus !== "Draft") {
          updatedStore.storeStatus = "Draft";
        } else {
          updatedStore.storeStatus = "Active";
        }

        setRowData(updatedStore);
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const dateConverter = (date: Date) => {
  const newDate = new Date(date);
  const formatedDate = newDate.toISOString().slice(0, 19).replace("T", " ");
  return formatedDate;
};

export const handleConfirm = async (
  rowData: Store,
  setRowData: React.Dispatch<React.SetStateAction<Store>>,
  startDate: Date | null,
  endDate: Date | null,
  closeModal: () => void
) => {
  if (startDate && endDate) {
    const formatedStart = dateConverter(startDate);
    const formatedEnd = dateConverter(endDate);
    const payLoadData = {
      status: rowData.storeStatus,
      start_date: formatedStart,
      end_date: formatedEnd,
      id: rowData.storeID,
    };

    fetch(`http://localhost:8080/store/${rowData.storeID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoadData),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedStore: Store = {
          ...rowData,
          storeStatus: data.status,
        };
        setRowData(updatedStore);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    closeModal();
  } else {
    console.log("Please select both start and end dates before confirming.");
  }
};

export const handleVisibility = (
  rowData: Store,
  setRowData: React.Dispatch<React.SetStateAction<Store>>,
  openModal: () => void
) => {
  if (rowData.storeStatus === "Invisible") {
    const payloadActiveData = { status: "Active" };
    fetch(`http://localhost:8080/store/${rowData.storeID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadActiveData),
    })
      .then((res) => {
        if (res.status === 200) {
          const updatedStore: Store = {
            ...rowData,
            storeStatus: "Active",
          };

          setRowData(updatedStore);
        } else {
          throw new Error("Failed to fetch data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    openModal();
  }
};
