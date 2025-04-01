//通用錯誤
export type ApiError = {
  status: false;
  message: string;
};

//登入
export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: true;
  exp: number;
  token: string;
  nickname: string;
};



//註冊
export type RegisterRequest = {
  email: string
  password: string
  nickname: string
}
export type RegisterResponse = {
  status: boolean
  uid: string
}


//確認
export type CheckoutSuccessResponse = {
  status: true;
  uid: string;
};

export type CheckoutErrorResponse = {
  status: false;
  message: string;
};

export type RegisterApiResponse = RegisterResponse | ApiError;
export type LoginApiResponse = LoginResponse | ApiError;
export type CheckoutResponse = CheckoutSuccessResponse | CheckoutErrorResponse;
