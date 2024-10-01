import { FC, useEffect, useState } from "react";

import './adminSuggestsPage.scss'
import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import AnySuggest from "@/components/anySuggest/anySuggest";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAllSuggests } from "@/api/suggest";
import { suggest } from "@/interfaces/interface";

const AdminSuggestsPage: FC = () =>{

    // -------------------------------
    // Получение данных всех саггестов
    // -------------------------------

    const {data: suggests, isFetched: suggestsFetched} = useGetRequest({fetchFunc: () => getAllSuggests(), key: [], enabled: true})

    const [initialSuggests, setInitialSuggests] = useState<suggest[]>(null || suggests)

    useEffect(() => {
        if (suggests && suggestsFetched){
            setInitialSuggests(suggests)
        }
    }, [suggests, suggestsFetched])

    const handleDeleteSuggestCallBack = (id: number) => {
        setInitialSuggests(prevItems => prevItems.filter(item => item.id !== id));
    }
    

    return(
        <div className="adminSuggestsPage">
            <AdminPanelAdditional page="gifts"/>

            <div className="adminSuggestsPage_content">
                <div className="adminSuggestsPage_heading">Пропозиції подарунків користувачів</div>

                <div className="adminSuggestsPage_content_suggests">
                    {suggestsFetched && initialSuggests && initialSuggests.length > 0 && initialSuggests.map((data: any, index: number)=>(
                        <AnySuggest data={data} key={index} handleDeleteSuggestCallBack={handleDeleteSuggestCallBack}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminSuggestsPage