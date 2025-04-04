import Cookies from 'js-cookie';
import {
  CheckoutSuccessResponse,
  CheckoutErrorResponse,
  CheckoutResponse,
} from '../../../types/auth';

export const checkoutUser = async (): Promise<CheckoutResponse> => {
  try {

    const token = Cookies.get('token');
    const response = await fetch(`https://todolist-api.hexschool.io/users/checkout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    });

    const responseData = await response.json();
    // console.log("解析的 responseData", responseData);

    if (response.ok) {
      const nickName = Cookies.get('nickname');
      const newRes = { ...responseData, nickName }
      console.log('newRes', newRes)
      return newRes as CheckoutSuccessResponse;
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