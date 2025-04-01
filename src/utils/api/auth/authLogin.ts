import Cookies from 'js-cookie';
import {
  LoginRequest,
  LoginResponse,
  LoginApiResponse,
  ApiError
} from '../../../types/auth';
export const loginUser = async (userData: LoginRequest): Promise<LoginApiResponse> => {
  try {
    const response = await fetch(`https://todolist-api.hexschool.io/users/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(response)
    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.ok) {
      Cookies.set('token', responseData.token);
      Cookies.set('nickname', responseData.nickname);
      return responseData as LoginResponse;
    }

    // 依照不同的 HTTP 狀態碼拋出錯誤
    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "欄位驗證失敗" };
      case 401:
        throw { status: false, message: responseData.message || "帳號密碼驗證錯誤" };
      case 404:
        throw { status: false, message: responseData.message || "用戶不存在" };
      default:
        throw { status: false, message: responseData.message || "登入失敗" };
    }
  } catch (error) {
    console.error("登入錯誤:", error);
    return error as ApiError;
  }
};