import Cookies from "js-cookie";
import {
  TodoContent,
  PutSuccessResponse,
  PutErrorResponse,
  PutResponse,
} from "../../../types/list";

export const putTodoList = async (id: string, todoData: TodoContent): Promise<PutResponse> => {
  try {

    const token = Cookies.get('token');
    const response = await fetch(`https://todolist-api.hexschool.io/todos/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...todoData })
    });

    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.ok) {
      return responseData as PutSuccessResponse;
    }


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