import { axiosInstance } from "../axiosinstance";
import Endpoint from '../Endpoint.json';

export const SaveUserService = async (RequestData) => {
    const ResponseData = await axiosInstance.post(Endpoint.Master.SAVE_Student, RequestData);
    return ResponseData;
}

export const GetCountryService = async () => {
    const ResponseData = await axiosInstance.get(Endpoint.Master.Get_Country);
    return ResponseData;
}


export const GetStateService = async (RequestData) => {
   
    const ResponseData = await axiosInstance.post(Endpoint.Master.Get_StateByCountryId, RequestData);
    console.log(11);
    console.log(RequestData);
      
    return ResponseData;
}

export const GetStudentService = async () => {
    const ResponseData = await axiosInstance.get(Endpoint.Master.Get_Student);
    return ResponseData;
}


export const LogInService = async (RequestData) => {
    console.log(RequestData);
    const ResponseData = await axiosInstance.post(Endpoint.Auth.LogIn,RequestData);
    return ResponseData;
}