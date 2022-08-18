import React from "react";
import "./Modal.css";

function Modal(props) {
  return (
    <div className={`modal ${props.show ? 'show': ''}`} onClick={props.onClose}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{props.title}</h2>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button onClick={props.clickHandler} className="modal-button btn-remove">
            Oteli Sil
          </button>
          <button onClick={props.onClose} className="modal-button btn-cancel">
            Vazgeç
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
