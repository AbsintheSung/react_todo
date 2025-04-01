/* API 類型 */

//api 通用
export type TodoItem = {
  id: string;
  createTime: number;
  content: string;
  status: boolean;
};

//讀取 (get)
export type TodoListSuccessResponse = {
  status: true;
  data: TodoItem[];
};
export type TodoListErrorResponse = {
  status: false;
  message: string;
};
export type TodoListResponse = TodoListSuccessResponse | TodoListErrorResponse;

//創建 (post)
export type ItemContent = {
  content: string
}
export type AddTodoSuccessResponse = {
  status: true;
  newTodo: TodoItem;
};

export type AddTodoErrorResponse = {
  status: false;
  message: string;
};
export type AddTodoResponse = AddTodoSuccessResponse | AddTodoErrorResponse;


//更新(put)
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

//更新( patch )
export type PatchSuccessResponse = {
  status: true;
  message: string;
};

export type PatchErrorResponse = {
  status: false;
  message: string;
};
export type PatchResponse = PatchSuccessResponse | PatchErrorResponse;


//刪除
export type DelSuccessResponse = {
  status: true;
  message: string;
};

export type DelErrorResponse = {
  status: false;
  message: string;
};
export type DelResponse = DelSuccessResponse | DelErrorResponse;