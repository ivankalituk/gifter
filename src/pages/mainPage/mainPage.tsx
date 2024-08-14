import { FC, useState } from "react";

import './mainPage.scss'

import Filters from "./components/filters/filters";
import GiftCard from "@/components/giftCard/giftCard";
import Selector from "./components/selector/selector";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAllGifts, getAllGiftsByTags } from "@/api/gifts";

interface MainPageInterface {
    scrollCallback: (block: boolean)=> void
}

const MainPage: FC <MainPageInterface>= ({scrollCallback}) => {

    const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

    const handleFiltersOpen = () =>{
        setFiltersOpen(!filtersOpen)
        scrollCallback(!filtersOpen)
    }

    const [giftKey, setGiftKey] = useState<number>(1)
    const [giftTags, setGiftTags] = useState<string[]>([])
    const {data: gifts, isFetched: giftsFetched} = useGetRequest({fetchFunc: () => getAllGiftsByTags(giftTags), key: [giftKey], enabled: true})

    // колбек на применение фильтров
    const filtersCallBack = (tags: string[]) => {
        // сначала добавить новые фильтры, потом обновить ключ
        setGiftTags(tags)
        setGiftKey(giftKey + 1)
        console.log(2)
        console.log(giftTags, giftKey)
    }

    return (
        <div className="mainPage">
            <div className="mainPage_container">

                <Filters filtersOpen = {filtersOpen} handleFiltersOpen ={handleFiltersOpen} filtersCallback = {filtersCallBack}/>

                <div className="mainPage_giftContent">

                    <Selector handleFiltersOpen ={handleFiltersOpen}  />

                    {giftsFetched && <div className="mainPage_giftContent_giftList">
                        {gifts.map((data: any, index:number) => (<GiftCard scrollCallback = {scrollCallback} key={index} data={data}/>))}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MainPage