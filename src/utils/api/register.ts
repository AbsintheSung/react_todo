export type RegisterRequest = {
  email: string
  password: string
  nickname: string
}
export type RegisterResponse = {
  status: boolean
  uid: string
}
export type RegisterError = {
  status: false
  message: string
};
export type ApiResponse = RegisterResponse | RegisterError;

export const registerUser = async (userData: RegisterRequest): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://todolist-api.hexschool.io/users/sign_up`, {
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
      return responseData as RegisterResponse;
    }

    // 依照不同的 HTTP 狀態碼拋出錯誤
    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "用戶已存在" };
      default:
        throw { status: false, message: responseData.message || "註冊失敗" };
    }
  } catch (error) {
    console.error("註冊錯誤:", error);
    return error as RegisterError;
  }
};