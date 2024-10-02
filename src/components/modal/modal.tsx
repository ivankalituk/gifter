import "./modal.scss"

import React, { FC, useState } from "react";

interface ModalInterface<T> {
    onClose: () => void;
    Component: React.ComponentType<any>;
    modalProps? : T
}

const Modal: FC <ModalInterface<any>> = ({onClose, Component, modalProps}) => {


    const [modalAimation, setModalAnimation] = useState<boolean>(true)

    const handleClose = () => {
        setModalAnimation(false)

        setTimeout(() => {
            onClose()
          }, 500);
    }

    return(
        <div className="modal">
            <div className={modalAimation? "modal_background" : "modal_background hide"} onClick={handleClose}/>

            <div className={modalAimation? "modal_modalOverlay" : "modal_modalOverlay hide"}>
                <Component modalProps = {modalProps} handleReportClose={handleClose}/>
            </div>
        </div>
    )
}

export default Modal