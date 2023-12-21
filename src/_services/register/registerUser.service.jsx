import axios from "axios";
import {registerApi} from '../../_constants/api.constant'
// import {getAppToken,getSelfToken} from '../../_helpers/auth/secureToken'

export async function registerUser(postData){
    const response=await axios.post(
        process.env.REACT_APP_AAVAZ_BIZ+registerApi.REGISTER,postData
        ).then(function(response) {
           
        return response;
        }).catch(function (error) {
        console.log('sandip');
        console.log(error.response);
        return error.response;
        });
    return response;
}