import React, { FC } from 'react';
import './modalReport.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {

  return (
    <div className="modalReport">
      <div className="modalReport_pageOverlay" onClick={onClose} />
      
      <div className="modalReport_overlay">
        <div className="modalReport_container">
          <div className="modalReport_content">
            <span>Відгук</span>
            <textarea placeholder="Введіть відгук"/>
            <button>Відправити відгук</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
