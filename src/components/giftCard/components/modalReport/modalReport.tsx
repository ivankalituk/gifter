import React, { FC, useState } from 'react';
import './modalReport.scss';



interface ModalProps {
  handleReportClose: () => void;
}

const Modal: FC<ModalProps> = ({ handleReportClose }) => {

  // создаём переменную для 
  const [reportAnimation, setReportAnimation] = useState<boolean>(true)

  const handleClose = () => {
    setReportAnimation(false)

    setTimeout(() => {
      handleReportClose()
    }, 500);
  }

  return (
    <div className="modalReport">
      <div className="modalReport_container">
        <div className="modalReport_content">
          <span>Відгук</span>
          <textarea placeholder="Введіть відгук"/>
          <button>Відправити відгук</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
