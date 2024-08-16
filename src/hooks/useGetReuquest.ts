import { useEffect, useState } from "react"

interface UseGetRequestInterface <T>{
    fetchFunc: () => Promise<T>,
    key: number[],
    enabled: boolean,
    // пока что просто эни, без мутации
    mutationFunc?: (data: any) => any
}

export const useGetRequest = <T>({fetchFunc, key, enabled, mutationFunc}: UseGetRequestInterface<T>) => {
    const [data, setData] = useState<any | null>(null)
    const [isFetched, setIsFetched] = useState<boolean>(false)

    useEffect(() => {
        
        if(enabled){
            fetchFunc().then((fetchedData: T) => {

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