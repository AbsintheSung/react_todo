import Cookies from "js-cookie";
export type TodoItem = {
  id: string;
  createTime: number;
  content: string;
  status: boolean;
};

export type TodoListSuccessResponse = {
  status: true;
  data: TodoItem[];
};

export type TodoListErrorResponse = {
  status: false;
  message: string;
};


export type TodoListResponse = TodoListSuccessResponse | TodoListErrorResponse;


export const getTodoList = async (): Promise<TodoListResponse> => {
  try {

    const token = Cookies.get('token');
    const response = await fetch('https://todolist-api.hexschool.io/todos', {
      method: "GET",
      headers: {
        "Authorization": `${token}`
      }
    });

    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.ok) {
      return responseData as TodoListSuccessResponse;
    }

    
    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "取得失敗" };
      default:
        throw { status: false, message: responseData.message || "取得失敗" };
    }
  } catch (error) {
    return error as TodoListErrorResponse;
  }
};