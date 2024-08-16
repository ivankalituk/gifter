import { useState } from "react"

interface useUpdateRequest <T> {
    fetchFunc: (data: any) => Promise<T>
}


export const useUpdateRequest = <T>({fetchFunc}:useUpdateRequest<T>) =>{
    const[data, setData] = useState<any | null>(null)
    const[isFetched, setIsFetched] = useState<boolean>(false)

    const mutatedFunc = (data: any) => fetchFunc(data).then((fechedData) =>{
        setData(fechedData)
        setIsFetched(true)
    })

    return {mutatedFunc, isFetched, data}
}
