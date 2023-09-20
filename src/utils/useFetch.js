
import { useState } from "react"


export const REQUEST_STATUS = {
    SUCCESS: "success",
    ERROR: "error",
    LOADING: "loading",
    IDLE: "idle",
  };

export const useFetch = ({url = "", defaultVal }) => {
    const [info, setInfo] = useState(defaultVal)
    const [status, setStatus] = useState("idle")
    
    const getData = async(newUrl)=> {
        
        try{
            setStatus(REQUEST_STATUS.LOADING)
            const response = await fetch(url || newUrl)
            const data = await response.json()
            if(!data.login) {
                setStatus(REQUEST_STATUS.ERROR)
                return
            }
            
                setInfo(data)

            
           
            
            setStatus(REQUEST_STATUS.SUCCESS)

            
            
            

        }catch{
            
            setStatus(REQUEST_STATUS.ERROR)
            
        }
       
    }
  

    return {
        info,
        status,       
        getData,
       }
}