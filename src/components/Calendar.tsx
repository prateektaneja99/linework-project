import React, { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleConfirm } from "../utils/helper";
import { Store } from "./StoreRow";

interface CalendarProps {
  closeModal: () => void;
  rowData: Store;
  setRowData: Dispatch<SetStateAction<Store>>;
}

const Calendar: React.FC<CalendarProps> = ({
  closeModal,
  rowData,
  setRowData,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };
  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <h2>Set as invisible</h2>
        <p>
          Your store will not be shown in search results during the pre-set
          period. You are still responsible for already confirmed orders.
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
            onClick={() =>
              handleConfirm(rowData, setRowData, startDate, endDate, closeModal)
            }
            disabled={!startDate || !endDate}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
