import { TodoItems,FilterType,TodoItemContent, } from '../../types/home'
import { Container } from "../../styles/container";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faTrash,faPenToSquare,faXmark,faPlus } from "@fortawesome/free-solid-svg-icons";
import { getTodoList } from "../../utils/api/list/getList";
import { postTodoList } from "../../utils/api/list/postList";
import { putTodoList } from "../../utils/api/list/putList";
import { deleteTodo } from "../../utils/api/list/delItemList";
import { patchTodoList } from '../../utils/api/list/patchList'
import { signOutUser } from '../../utils/api/auth/authSignout'
import { checkoutUser } from '../../utils/api/auth/authCheckout';
import {
  InputContent,
  TodoContent,
  TodoItem,
  TodoText,
  ButtonGroup,
  EditInput
} from '../../styles/home'
import Header from '../../components/Header';
import EmptyContent from '../../components/EmptyContent';
import FilterButtons from './FilterButtons';
import { ClipLoader } from "react-spinners";
const Home = ()=>{
  const [inputValue, setInputValue] = useState("")
  const [todoItems,setTodoItems] = useState< TodoItems[] >([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>("")
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [otherLoading,setOtherLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  const isLoading = (id: string, action: string): boolean => {
    return loadingItemId === id && loadingAction === action;
  };
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
    const checkout = async () => {
      const response = await checkoutUser();
      if (!response.status) {
        navigate("/login"); 
      }
      console.log('測試')
    };
    checkout();
  }, [navigate]); 

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

  // 完成/未完成 狀態更新
  const handleCheckboxStatus = async (id: string) => {
    /*後端回傳 更新成功
      1. 使用 map 處理後，更新列表。
      2.也可以在這邊在發送一個獲取資料的請求，確保資料正確。
      看人使用
    */
    setLoadingItemId(id);
    setLoadingAction("checkbox");
    setOtherLoading(true)
    const response  = await patchTodoList(id)
    console.log(response)
    if(response.status){
      setTodoItems(todoItems.map((item) => {
        if (item.id === id) {
          return { ...item, status: !item.status };
        }
        return item;
      }));
    }else{
      console.log('狀態更新失敗')
    }
    setLoadingItemId(null);
    setLoadingAction(null);
    setOtherLoading(false)
  }

  //添加新項目
  const addTodoItem = async () => {
    const todoItem:TodoItemContent = {
      content:inputValue
    } 
    setOtherLoading(true)
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
    setOtherLoading(false)
  }

  // 刪除項目
  const handleDelTodoItem = async (id: string) => {
    /*後端只回傳 刪除成功
      1. 可以直接透過 filter 方式，更新整個資料。
      2.也可以在這邊在發送一個獲取資料的請求，確保資料正確。
      看人使用
    */
    const response = await deleteTodo(id)
    if(response.status){
      setTodoItems(todoItems.filter((item) => item.id !==id));
    }else{
      console.log('刪除失敗')
    }
  }

  // 開啟編輯項目
  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    console.log(text)
    setEditValue(text)
  }

  // 確認编辑
  const saveEdit = async (id:string) => {
    /*後端只回傳 更新成功
      1. 可以直接透過 map 方式，更新整個資料。
      2.也可以在這邊在發送一個獲取資料的請求，確保資料正確。
      看人使用
    */
    setLoadingItemId(id);
    setLoadingAction("save");
    setOtherLoading(true)
    const response = await putTodoList(id,{ content : editValue } )
    if(response.status){
      setTodoItems(todoItems.map((item) => (item.id === editingId ? { ...item, content: editValue } : item)))
    }else{
      console.log(response.message)
    }
    setEditingId(null)
    setEditValue("")
    setLoadingItemId(null);
    setLoadingAction(null);
    setOtherLoading(false)
  }

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  } 
  const handleSignOut =async ()=>{
    const response = await signOutUser();
    if(response.status){
      console.log('登出成功')
      navigate('/login')
    }else{
      console.log('登出失敗')
    }
  }
  
  return(
    <>
      <Header onSignOut={handleSignOut}/>
     
      <Container>
        <InputContent>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={otherLoading}
          />
          <button onClick={addTodoItem}>
            {otherLoading? (
              <ClipLoader size={20} color="#FFD370" />
              ) : (
                <FontAwesomeIcon icon={faPlus} />
            )}
          </button>
        </InputContent>

        {todoItems.length === 0 ? ( <EmptyContent />):(
          <>
            <FilterButtons 
              filter={filter} 
              onFilterChange={handleFilterChange} 
            />
            <TodoContent>
              {filterTodoItems.map((item) => (
                <TodoItem key={item.id}>
                  {editingId !== item.id && (
                    <button className="todo-checkbox" onClick={() => handleCheckboxStatus(item.id)} disabled={otherLoading}>
                       {isLoading(item.id, "checkbox") ? (
                          <ClipLoader size={20} color="#FFD370" />
                        ) : (
                          <p>
                            {item.status ? <FontAwesomeIcon icon={faCheck} /> : ""}
                          </p>
                        )}
                    </button>
                  )}
                    {editingId === item.id ? (
                    <>
                      <EditInput
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        type="text"
                        disabled={otherLoading}
                      />
                      <ButtonGroup>
                        <button className="todo-savebtn" onClick={()=>saveEdit(item.id)} disabled={otherLoading}>
                          {isLoading(item.id, "save") ? (
                            <ClipLoader size={20} color="#FFD370" />
                          ) : (
                            <FontAwesomeIcon icon={faCheck} />
                          )}
                        </button>
                        <button className="todo-cancelbtn" onClick={cancelEdit} disabled={otherLoading}>
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </ButtonGroup>
                    </>
                    ) : (
                    <>
                      <TodoText $status={item.status}>{item.content}</TodoText>
                      <ButtonGroup>
                        {!item.status &&(
                          <button className="todo-editbtn" onClick={() => startEditing(item.id, item.content)} disabled={otherLoading}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                        )}
                        <button className="todo-delbtn" onClick={()=>handleDelTodoItem(item.id)} disabled={otherLoading}>
                          {isLoading(item.id, "delete") ? (
                            <ClipLoader size={20} color="#FFD370" />
                          ) : (
                            <FontAwesomeIcon icon={faTrash} />
                          )}
                        </button> 
                      </ButtonGroup>
                    </>
                    )}
                </TodoItem>
              ))}
            </TodoContent>
          </>
        )}
      </Container>
    </>
  )
}

export default Home;