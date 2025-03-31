import Cookies from "js-cookie";
export type TodoItem = {
  id: string;
  createTime: number;
  content: string;
  status: boolean;
};
export type AddTodoSuccessResponse = {
  status: true;
  newTodo: TodoItem;
};

export type AddTodoErrorResponse = {
  status: false;
  message: string;
};


export type AddTodoResponse = AddTodoSuccessResponse | AddTodoErrorResponse;

export const addTodo = async (content: string): Promise<AddTodoResponse> => {
  try {

    const token = localStorage.getItem('token') || Cookies.get('token');
    const response = await fetch('https://todolist-api.hexschool.io/todos', {
      method: "POST",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
    });

    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.status === 201) {
      return responseData as AddTodoSuccessResponse;
    }

    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "新增失敗" };
      default:
        throw { status: false, message: responseData.message || "新增失敗" };
    }
  } catch (error) {
    return error as AddTodoErrorResponse;
  }
};