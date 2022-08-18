import React, { useState, useEffect } from "react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import uuid from 'react-native-uuid';
import "./AddHotelForm.css";

function AddHotelForm() {
  const [form, setForm] = useState({
    hotelName: '',
    id: '',
    like: 0,
    time: new Date().getTime(),
  });
  const [localData, setLocalData] = useState([]);


  const onChangeInput = (e, form) => {
    setForm({
      ...form,
      hotelName: e.target.value.toUpperCase(),
      id: uuid.v4(),
      like: 0,
      time: new Date().getTime(),
    });
  };

  useEffect(() => {
    if(localData.length > 0){
      localStorage.setItem("ItemData", JSON.stringify(localData));
    }
  }, [localData]);

  useEffect(() => {
    setLocalData(getData());
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault();
    if (form.hotelName === "") {
      return false;
    }

    setLocalData([...localData, form]); 
    NotificationManager.success('Success message', `${form.hotelName} EKLENDİ`, 2000);   
    setForm({ hotelName: "" });
  };

  const getData = () => {
    if (localStorage.getItem("ItemData") !== null) {
      let storedNames = JSON.parse(localStorage.getItem("ItemData") || "{}");
      return storedNames;
    }
    return [];
  }

  return (
    <div>
      <div className="link-header">Otel Ekleme Sayfası</div>
      <div className="line"></div>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="nameFormControlInput" className="form-label">
            Otel Adı:
          </label>
          <input
            id="nameFormControlInput"
            type="text"
            name="hotelName"
            placeholder="Otel Adı"
            className="form-control"
            value={form.hotelName}
            onChange={(e) => onChangeInput(e, form)}
          />
        </div>
        <button className="btn btn-primary">EKLE</button>
      </form>
      <NotificationContainer/>
    </div>
  );
}

export default AddHotelForm;
