import { useEffect, useState } from "react"

interface UseGetRequestInterface {
    fetchFunc: () => Promise<Response>,
    key: number[],
    enabled: boolean,
    mutationFunc?: (data: any) => any
    
}

export const useGetRequest = ({fetchFunc, key, enabled, mutationFunc}: UseGetRequestInterface) => {
    const [data, setData] = useState<any | null>(null)
    const [isFetched, setIsFetched] = useState<boolean>(false)

    useEffect(() => {
        
        if(enabled){
            fetchFunc().then((fetchedData: any) => {

                let data = fetchedData

                if(mutationFunc){
                    data = mutationFunc(fetchedData)
                }

                setIsFetched(true)
                setData(data)

            })
        }
    }, key)

    return{data, isFetched}
}