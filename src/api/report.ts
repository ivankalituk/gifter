import axios from "axios";

export async function getReportById(data: any) {
    try{
        const response = await axios.get('http://localhost:1000/report/' + data.report_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}