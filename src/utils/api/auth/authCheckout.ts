import Cookies from 'js-cookie';
import {
  CheckoutSuccessResponse,
  CheckoutErrorResponse,
  CheckoutResponse,
} from '../../../types/auth';

export const checkoutUser = async (): Promise<CheckoutResponse> => {
  try {

    const token = Cookies.get('token');

    if (!token) {
      return { status: false, message: "用户未登录" };
    }

    const response = await fetch(`https://todolist-api.hexschool.io/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    });

    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.ok) {
      return responseData as CheckoutSuccessResponse;
    }

    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "該 Token 不存在" };
      default:
        throw { status: false, message: responseData.message || "該 Token 不存在" };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { status: false, message: error.message };
    }
    return error as CheckoutErrorResponse;
  }
};