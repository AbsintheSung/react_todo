import Cookies from "js-cookie";

export type TodoContent = {
  content: string;
};

export type PutSuccessResponse = {
  status: true;
  message: string;
};

export type PutErrorResponse = {
  status: false;
  message: string;
};

export type PutResponse = PutSuccessResponse | PutErrorResponse;

export const updateTodo = async (id: string, todoData: TodoContent): Promise<PutResponse> => {
  try {
    // 从 localStorage 或 cookie 获取 token
    const token = Cookies.get('token');
    const response = await fetch(`https://todolist-api.hexschool.io/todos/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoData)
    });

    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.ok) {
      return responseData as PutSuccessResponse;
    }

    // 依照不同的 HTTP 状态码处理错误
    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "更新失敗" };
      default:
        throw { status: false, message: responseData.message || "更新失敗" };
    }
  } catch (error) {
    console.error("更新 Todo 錯誤:", error);
    return error as PutErrorResponse;
  }
};