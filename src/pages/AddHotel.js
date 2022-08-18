import React from "react";
import { Link } from "react-router-dom";
import AddHotelFrom from "../components/AddHotelFormComponent/AddHotelForm";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddHotel() {
  return (
    <div className="add-page">
      <Link to="/">
        <h3>
          <FontAwesomeIcon icon={faArrowLeft} /> Otel Listesine Geri Dön
        </h3>
      </Link>
      <AddHotelFrom />
    </div>
  );
}

export default AddHotel;
