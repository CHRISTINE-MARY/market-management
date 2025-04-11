import React, { useState } from "react";
import StockSummary from "../features/StockSummary";
import DailyRevenue from "../features/DailyRevenue";
import Calendar from "../features/Calendar";
import { useMessage } from "../context/MessageContext";
import "../styles/overview.css"

export default function Overview() {
  const [currDate, setCurrDate] = useState(new Date());
  const {message,updateMessage}=useMessage();

  return (
    <>
      <aside className="calendar">
        <Calendar selectedDate={currDate} dateChange={setCurrDate} />
      </aside>
      <section className="overview-container">
        <div className="overview-card">
          <StockSummary />
        </div>
        <div className="overview-card">
          <DailyRevenue date={currDate} />
        </div>
      </section>
      <div>{message && (
          <div className={`toast`}>
            <span>{message}</span>
            <button className="close-btn" onClick={() => updateMessage("")}>
              &times;
            </button>
          </div>
        )}</div>
    </>
  );
}
