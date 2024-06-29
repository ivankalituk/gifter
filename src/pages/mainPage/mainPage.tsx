import { FC } from "react";

import './mainPage.scss'

import search from '@/assets/images/Search.svg'

import Filters from "./components/filters/filters";
import GiftCard from "@/components/giftCard/giftCard";

const MainPage: FC = () => {
    return (
        <div className="mainPage">
            <div className="mainPage_container">

                <Filters />

                <div className="mainPage_giftContent">
                    <div className="mainPage_giftContent_giftList">
                        <GiftCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage