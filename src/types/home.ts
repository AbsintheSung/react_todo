export type TodoItems = {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}

export type FilterType = "all" | "active" | "completed"

export type TodoItemContent = {
  content: string
}