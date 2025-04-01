import Cookies from "js-cookie";
import { DelSuccessResponse, DelErrorResponse, DelResponse } from "../../../types/list";

export const deleteTodo = async (id: string): Promise<DelResponse> => {
  try {

    const token = Cookies.get('token');
    const response = await fetch(`https://todolist-api.hexschool.io/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`
      }
    });

    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.ok) {
      return responseData as DelSuccessResponse;
    }

    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "刪除失敗" };
      default:
        throw { status: false, message: responseData.message || "刪除失敗" };
    }
  } catch (error) {
    return error as DelErrorResponse;
  }
};
