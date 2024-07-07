import { FC, useState } from "react";

import './mainPage.scss'

import Filters from "./components/filters/filters";
import GiftCard from "@/components/giftCard/giftCard";
import Selector from "./components/selector/selector";

interface MainPageInterface {
    scrollCallback: (block: boolean)=> void
}

const MainPage: FC <MainPageInterface>= ({scrollCallback}) => {

    const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

    const handleFiltersOpen = () =>{
        setFiltersOpen(!filtersOpen)
        scrollCallback(!filtersOpen)
        // если тру то колбек
    }


    return (
        <div className="mainPage">
            <div className="mainPage_container">

                <Filters filtersOpen = {filtersOpen} handleFiltersOpen ={handleFiltersOpen}/>

                <div className="mainPage_giftContent">

                    <Selector handleFiltersOpen ={handleFiltersOpen}  />

                    <div className="mainPage_giftContent_giftList">
                        <GiftCard scrollCallback = {scrollCallback}/>
                        <GiftCard scrollCallback = {scrollCallback}/>
                        <GiftCard scrollCallback = {scrollCallback}/>
                        <GiftCard scrollCallback = {scrollCallback}/>
                        <GiftCard scrollCallback = {scrollCallback}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage