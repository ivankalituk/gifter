import { FC } from "react";

import './mainPage.scss'

import Filters from "./components/filters/filters";
import GiftCard from "@/components/giftCard/giftCard";
import Selector from "./components/selector/selector";

const MainPage: FC = () => {

    return (
        <div className="mainPage">
            <div className="mainPage_container">

                <Filters />

                <div className="mainPage_giftContent">

                    <Selector />

                    <div className="mainPage_giftContent_giftList">
                        <GiftCard />
                        <GiftCard />
                        <GiftCard />
                        <GiftCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage