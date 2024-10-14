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

export async function deleteReport(data: any) {
    try{
        const response = await axios.delete('http://localhost:1000/report/' + data.report_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function deleteReportGift(data: any) {
  try {
    console.log(data)
    await axios.delete('http://localhost:1000/report-gift', {
      data: {
        gift_id: data.gift_id,
        report_id: data.report_id
      }
    });
  } catch (error) {
    console.log("ERROR WHILE GETTING DATA", error);
  }
}

export async function getGiftByReport(data: any) {
    try{
        const response = await axios.get('http://localhost:1000/report/gift/' + data.report_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}