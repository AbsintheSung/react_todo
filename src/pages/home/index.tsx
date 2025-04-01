import { Container } from "../../styles/container";
import styled from "styled-components"
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faTrash,faPenToSquare,faXmark } from "@fortawesome/free-solid-svg-icons";
import { getTodoList } from "../../utils/api/list/getList";
import { postTodoList } from "../../utils/api/list/postList";

const InputContent = styled.div`
  display: flex;
  > input{
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
  }
  > button{
    padding: 10px 15px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: #FFD370;
    }
  }
`

const FilterContent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  /* & > .filter-Btn{
    flex:1;
    padding: 8px 16px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: #FFD370;
      border-bottom: 1px solid #000000;
    }
  } */
`
const FilterButton =  styled.button<{ $active: boolean }>`
  flex:1;
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-bottom: ${(props) => (props.$active ? " 1px solid #000000" : "transparent")};
  &:hover {
    color: #FFD370;
    /* border-bottom: 1px solid #000000; */
  }
`

const TodoContent = styled.ul`
  padding: 16px;
`
const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px;
  gap:0px 12px;
  border-bottom: 1px solid #eee;
  & > .todo-checkbox{
    cursor: pointer;
    & > p{
      margin: 0px;
      width: 20px;
      height: 20px;
      border: 2px solid #000000;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  /* & >.todo-content{
    flex: 1;
  } */
  
  /* & > .todo-delbtn{
    background: none;
    padding: 0px;
    border: none;
    color: #ff5252;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      color: #ff0000;
    }
  } */
  `
const TodoText = styled.p<{ $status: boolean }>`
  flex: 1;
  margin: 0;
  text-decoration: ${(props) => (props.$status ? "line-through" : "none")};
  color: ${(props) => (props.$status ? "#888" : "#333")};
`
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 0px 12px;
  & > button{
    background: none;
    padding: 0px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
   
  }
  & > .todo-delbtn,.todo-cancelbtn{
    color: #ff5252;
    &:hover {
      color: #ff0000;
    }
  }
  & > .todo-editbtn,.todo-savebtn{
    color: #07a82f;
    &:hover {
      color: #3ae957;
    }
  }
`

type TodoItem = {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}
type FilterType = "all" | "active" | "completed"
type TodoItemContent = {
  content:string
}

const Home = ()=>{
  const [inputValue, setInputValue] = useState("")
  const [todoItems,setTodoItems] = useState< TodoItem[] >([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>("")

  const fetchTodos = async () => {
    const response = await getTodoList();
    if(response.status){
      console.log('獲取成功',response.data)
      setTodoItems([...response.data])
    }else{
      console.log('獲取失敗')
      setTodoItems([])
    }
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  // 篩選邏輯
  const handleFilterChange = (value: FilterType) => {
    setFilter(value); 
  }

  // 渲染原始資料，根據狀態跟新內容
  const filterTodoItems = todoItems.filter((todo) => {
    if (filter === "active") return !todo.status
    if (filter === "completed") return todo.status
    return true
  })

  // 完成/未完成 邏輯 
  const handleCheckboxStatus = (id: string) => {
    setTodoItems(todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    }));
  }

  //添加新項目
  const addTodoItem = async () => {
    // const newTodo: TodoItem = {
    //   content: inputValue,
    //   createTime:  Date.now(),
    //   id:  Date.now().toString(),
    //   status: false,
    // }
    const todoItem:TodoItemContent = {
      content:inputValue
    } 
    const response = await postTodoList(todoItem)
    if(response.status){
      /*後端回傳新增的單一項目
        1. 可以直接解構後，再添加新的單一資料進去，這樣可以不用再發送獲取資料的請求。
        2.也可以在這邊在發送一個獲取資料的請求，確保資料正確。
        看人使用
      */
      setTodoItems([...todoItems, response.newTodo])
    }else{
      console.log('新增失敗')
    }
    console.log(response)
    setInputValue("")
  }

  // 刪除項目
  const handleDelTodoItem = (id: string) => {
    setTodoItems(todoItems.filter((item) => item.id !==id));
  }

  // 編輯項目
  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    console.log(text)
    setEditValue(text)
  }

  // 保存编辑
  const saveEdit = () => {
    if (editingId !== null && editValue.trim() !== "") {
      setTodoItems(todoItems.map((item) => (item.id === editingId ? { ...item, content: editValue } : item)))
      setEditingId(null)
      setEditValue("")
    }
  }

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  } 


  // useEffect(() => {
  //   const responseData: TodoItem[] = [
  //     {
  //       content: "買晚餐",
  //       createTime: 1743340055,
  //       id: "-OMb9XcMmDop98NqTNjM",
  //       status: false
  //     },
  //     {
  //       content: "買早餐",
  //       createTime: 1743340055,
  //       id: "-OMb9XcMmDop98NqTNjk",
  //       status: false
  //     },
  //     {
  //       content: "買午餐",
  //       createTime: 1743340055,
  //       id: "-OMb9XcMmDop98NqTNj",
  //       status: false
  //     }
  //   ];
  //   setTodoItems(responseData);
  // }, []); 

  // // 監聽狀態
  // useEffect(() => {
  //   console.log("todoItems 更新後:", todoItems);
  // }, [todoItems]); 
  return(
    <>
      <Container>
        <InputContent>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={addTodoItem}>+</button>
        </InputContent>

        <FilterContent>
          <FilterButton $active={filter === "all"} onClick={() => handleFilterChange("all")}>
            全部
          </FilterButton>
          <FilterButton $active={filter === "active"} onClick={() => handleFilterChange("active")}>
            未完成
          </FilterButton>
          <FilterButton $active={filter === "completed"} onClick={() => handleFilterChange("completed")}>
            已完成
          </FilterButton>
        </FilterContent>
        <TodoContent>
          {/* <TodoItem>
            <div className="todo-checkbox">
              <p></p>
            </div>
            <div className="todo-content">內容內容內容內容內容</div>
            <button className="todo-delbtn">刪除按鈕</button>
          </TodoItem> */}
          {filterTodoItems.map((item) => (
            <TodoItem key={item.id}>
              {editingId !== item.id && (
                <div className="todo-checkbox" onClick={() => handleCheckboxStatus(item.id)}>
                  <p>
                    {item.status? <FontAwesomeIcon icon={faCheck} /> : ""}
                  </p>
                </div>
              )}
              {/* <div className="todo-content">{item.content}</div>
              <button className="todo-delbtn" onClick={()=>handleDelTodoItem(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button> */}
               {editingId === item.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    type="text"
                  />
                  <ButtonGroup>
                    <button className="todo-savebtn" onClick={saveEdit}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button className="todo-cancelbtn" onClick={cancelEdit}>
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </ButtonGroup>
                </>
                ) : (
                <>
                  {/* <div className="todo-content">{item.content}</div> */}
                  <TodoText $status={item.status}>{item.content}</TodoText>
                  <ButtonGroup>
                    {!item.status &&(
                      <button className="todo-editbtn" onClick={() => startEditing(item.id, item.content)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    )}
                     {/* <button className="todo-editbtn" onClick={() => startEditing(item.id, item.content)}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button> */}
                    <button className="todo-delbtn" onClick={()=>handleDelTodoItem(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button> 
                  </ButtonGroup>
                </>
                )}
            </TodoItem>
          ))}
        </TodoContent>
      </Container>
    </>
  )
}

export default Home;