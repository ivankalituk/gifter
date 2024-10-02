import axios from "axios";

export async function getReportById(data: any) {
    try{
        const response = await axios.get('http://localhost:1000/report/' + data.report_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function postReport(data: any) {
    try{
        await axios.post('http://localhost:1000/report', data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function getAllReports() {
    try{
        const response = await axios.get('http://localhost:1000/report');
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}