export type RegisterRequest = {
  email: string
  password: string
  nickname: string
}

export type RegisterResponse = {
  status: boolean
  uid: string
}
export type ApiError = {
  message: string;
  status: boolean;
}

export type ApiResponse<T> = {
  data?: T
  error?: string | ApiError
}

export const registerUser = async (userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
  const response = await fetch(`https://todolist-api.hexschool.io/users/sign_up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  // API 成功只有 201
  if (response.status === 201) {
    const responseData = await response.json();
    console.log("responseData", responseData);
    return { data: responseData }
  }

  // API 失敗只有 400，當其他一起處理
  const errorData = await response.json();
  throw { error: errorData.message || "註冊失敗" };
}