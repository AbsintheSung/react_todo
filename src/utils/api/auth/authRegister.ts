import {
  ApiError,
  RegisterRequest,
  RegisterResponse,
  RegisterApiResponse
} from "../../../types/auth"
export const registerUser = async (userData: RegisterRequest): Promise<RegisterApiResponse> => {
  try {
    const response = await fetch(`https://todolist-api.hexschool.io/users/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    // console.log(response)
    const responseData = await response.json();
    // console.log("解析的 responseData", responseData);

    if (response.ok) {
      return responseData as RegisterResponse;
    }


    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "用戶已存在" };
      default:
        throw { status: false, message: responseData.message || "註冊失敗" };
    }
  } catch (error) {
    // console.error("註冊錯誤:", error);
    return error as ApiError;
  }
};