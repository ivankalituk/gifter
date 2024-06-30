import { FC } from "react";

import './mainPage.scss'

import search from '@/assets/images/Search.svg'
import tick from '@/assets/images/tick.svg'

import Filters from "./components/filters/filters";
import GiftCard from "@/components/giftCard/giftCard";


const MainPage: FC = () => {
    return (
        <div className="mainPage">
            <div className="mainPage_container">

                <Filters />

                <div className="mainPage_giftContent">

                    <div className="mainPage_giftContent_selectors">
                        <div className="mainPage_giftContent_selector">
                            <span>Новіші</span>
                            <img src={tick} alt="tick" />

                            <div className="mainPage_giftContent_selector_menu">Старіші</div>
                        </div>

                        <div className="mainPage_giftContent_selector">
                            <span>Кращі</span>
                            <img src={tick} alt="tick" />

                            <div className="mainPage_giftContent_selector_menu">Гірші</div>
                        </div>

                        <div className="mainPage_giftContent_selector">
                            <span>Популярніші</span>
                            <img src={tick} alt="tick" />
                            
                            <div className="mainPage_giftContent_selector_menu">Непопулярні</div>
                        </div>
                    </div>

                    <div className="mainPage_giftContent_giftList">
                        <GiftCard />
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