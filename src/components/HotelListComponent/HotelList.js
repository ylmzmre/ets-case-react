import React, { useState, useEffect } from "react";
import Modal from "../ModalComponent/Modal";
import Pagination from "../PaginationComponent/Pagination";

import logo from "../../logo.svg";
import {
  faArrowUp,
  faArrowDown,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./HotelList.css";

function HotelList() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState("1");
  const [localData, setLocalData] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [deleteItem, setDeleteItem] = useState({});
  const [activeClass, setActiveClass] = useState(1);

  useEffect(() => {
    setMockData(getData());
  }, []);

  const getData = () => {
    if (localStorage.getItem("ItemData") !== null) {
      let storedNames = JSON.parse(localStorage.getItem("ItemData") || "{}");
      storedNames.reverse();
      return storedNames;
    }
    return [];
  };

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  if (selected === "1") {
    mockData.sort((a, b) => {
      return b.like - a.like;
    });
  } else {
    mockData.sort((a, b) => {
      return a.like - b.like;
    });
  }

  const counterUp = (item) => {
    const newState = mockData.map((obj) => {
      if (obj.id === item.id) {
        return {
          ...obj,
          like: item.like + 1,
          time: new Date().getTime(),
        };
      }
      return obj;
    });

    setLocalData(newState);
    dataSort();
  };
  const counterDown = (item) => {
    const newState = mockData.map((obj) => {
      if (obj.id === item.id) {
        return {
          ...obj,
          like: item.like - 1,
          time: new Date().getTime(),
        };
      }
      return obj;
    });

    setLocalData(newState);
    dataSort();
  };

  useEffect(() => {
    if (localData.length > 0) {
      localStorage.setItem("ItemData", JSON.stringify(localData));
    }
    return setMockData(getData());
  }, [localData]);

  const dataSort = () => {
    mockData.sort((a, b) =>
      b.like > a.like ? 1 : a.like === b.like ? (b.time > a.time ? 1 : -1) : -1
    );
  };

  const openModal = (item) => {
    setShow(true);
    setDeleteItem(item);
  };

  const removeItem = () => {
    const newState = mockData.filter((obj) => obj.id !== deleteItem.id);
    NotificationManager.warning('Warning message', `${deleteItem.hotelName} Silindi`, 2000);  
    setLocalData(newState);
    dataSort();
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mockData.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setActiveClass(pageNumber);
  }
  

  return (
    <div>
      <div className="input-group mb-3 select-item">
        <select className="form-select" value={selected} onChange={onChange}>
          <option disabled value="">
            Sıralama
          </option>
          <option value="1">Puan (Artan)</option>
          <option value="2">Puan (Azalan)</option>
        </select>
      </div>
      {/* List */}
      {currentPosts.map((item, index) => (
        <div id="itemList" className="list-item" key={index}>
          <div className="list-item-img">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="list-item-text">
            <div className="list-item-header">{item.hotelName}</div>
            <div className="list-item-btn">
              <p>
                <strong>{item.like}</strong> Puan
              </p>
            </div>
            <div className="list-item-point">
              <span onClick={() => counterUp(item)}>
                <FontAwesomeIcon icon={faArrowUp} /> Puan Arttır
              </span>
              <span onClick={() => counterDown(item)}>
                <FontAwesomeIcon icon={faArrowDown} /> Puan Azalt
              </span>
            </div>
          </div>
          <div
            className="list-item-delete"
            onClick={() => openModal(item)}
            click="modalObj(item)"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </div>
        </div>
      ))}
      {/* List */}
      {/* Pagination */}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={mockData.length}
        paginate={paginate}
        activeClass={activeClass}
      />
      {/* Pagination */}
      {/* Modal */}
      <Modal
        title="Oteli Sil"
        onClose={() => setShow(false)}
        show={show}
        clickHandler={removeItem}
      >
        <p>
          <strong>{deleteItem.hotelName}</strong> ’i silmek istediğinizden emin
          misiniz?
        </p>
      </Modal>
      {/* Modal */}
      <NotificationContainer/>
    </div>
  );
}

export default HotelList;
