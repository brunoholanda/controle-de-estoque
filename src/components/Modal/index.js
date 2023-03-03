import React from 'react';

import './styles.css';

const Modal = ({id = "model",onClose = () => {},title}) => {

    const handleOutSideClick = (e) => {
        if (e.target.id === id) onClose()
    }
  return (
      <div id="model" className="containerModal" onClick={handleOutSideClick}>
          <div className="box">
              <p>{title}</p>
              <button onClick={onClose} className="button buttonClass">Ok!</button>
          </div>
          
      </div>
  );
}

export default Modal;