import React from "react";
import { Link } from "react-router-dom";
import HotelList from "../components/HotelListComponent/HotelList";

function Home() {
  return (
    <div>
      <div className="add-link">
        <Link to="/add-hotel">
          <div className="add-btn">+</div>
        </Link>
        <div className="add-text">OTEL EKLE</div>
      </div>
      <div className="line"></div>
      <HotelList />
    </div>
  );
}

export default Home;
