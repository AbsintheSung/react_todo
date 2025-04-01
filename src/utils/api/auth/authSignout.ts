import Cookies from 'js-cookie';
import {
  SignOutResponse,
  ApiError
} from '../../../types/auth';
export const signOutUser = async (): Promise<SignOutResponse> => {
  try {
    const token = Cookies.get('token');
    const response = await fetch(`https://todolist-api.hexschool.io/users/sign_out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
    });
    // console.log(response)
    const responseData = await response.json();
    // console.log("解析的 responseData", responseData);

    if (response.ok) {
      Cookies.remove("token");
      return responseData as SignOutResponse;
    }


    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "登出失敗" };
      default:
        throw { status: false, message: responseData.message || "登出失敗" };
    }
  } catch (error) {
    // console.error("登出錯誤:", error);
    return error as ApiError;
  }
};