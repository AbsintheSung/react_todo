import Cookies from "js-cookie";
export type PatchSuccessResponse = {
  status: true;
  message: string;
};

export type PatchErrorResponse = {
  status: false;
  message: string;
};

export type PatchResponse = PatchSuccessResponse | PatchErrorResponse;

export const patchTodoList = async (id: string): Promise<PatchResponse> => {
  try {

    const token = Cookies.get('token');
    const response = await fetch(`https://todolist-api.hexschool.io/todos/${id}/toggle`, {
      method: "PATCH",
      headers: {
        "Authorization": `${token}`
      }
    });

    const responseData = await response.json();
    console.log("解析的 responseData", responseData);

    if (response.ok) {
      return responseData as PatchSuccessResponse;
    }


    switch (response.status) {
      case 400:
        throw { status: false, message: responseData.message || "修改失敗" };
      default:
        throw { status: false, message: responseData.message || "修改失敗" };
    }
  } catch (error) {
    console.error("切換狀態失敗", error);
    return error as PatchErrorResponse;
  }
};