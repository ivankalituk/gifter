import { FC } from "react";

import './markedList.scss'

const MarkedList: FC = () => {
    return(
        <div className="markedList">
            <div className="markedList_heading">HEADING</div>

            <div className="markedList_giftList">
                <div className="markedList_gift">gift</div>
                <div className="markedList_gift">gift</div>
                <div className="markedList_gift">gift</div>
                <div className="markedList_gift">gift</div>
            </div>
        </div>
    )
}

export default MarkedList