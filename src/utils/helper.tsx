import { Store } from "@/components/StoreRow";
import { FETCH_API, FETCH_PRODUCTS, FETCH_STORES } from "./constants";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/pages";

// Function to fetch and set product data
export const getProducts = async (
  setProducts: Dispatch<SetStateAction<Product[]>>
) => {
  fetch(FETCH_PRODUCTS)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const relevantProducts = data.map((product: any) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          seller: product.store_name,
        };
      });

      setProducts(relevantProducts);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
};

// Function to fetch and set store data
export const getStores = async (
  setStoreData: Dispatch<SetStateAction<Store[]>>
) => {
  fetch(FETCH_STORES)
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
};

// Function to handle status changes for a store
export const handleStatus = async (
  rowData: Store,
  setRowData: React.Dispatch<React.SetStateAction<Store>>
) => {
  const payLoadData = {
    status: rowData.storeStatus == "Active" ? "Draft" : "Active",
  };
  fetch(`${FETCH_API + rowData.storeID}`, {
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

// Function to format a date into a specific format
const dateConverter = (date: Date) => {
  const newDate = new Date(date);
  const formatedDate = newDate.toISOString().slice(0, 19).replace("T", " ");
  return formatedDate;
};

// Function to handle store invisibility and confirmation
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

    fetch(`${FETCH_API + rowData.storeID}`, {
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

// Function to handle store visibility changes
export const handleVisibility = (
  rowData: Store,
  setRowData: React.Dispatch<React.SetStateAction<Store>>,
  openModal: () => void
) => {
  if (rowData.storeStatus === "Invisible") {
    const payloadActiveData = { status: "Active" };
    fetch(`${FETCH_API + rowData.storeID}`, {
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
