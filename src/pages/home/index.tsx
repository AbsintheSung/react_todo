import { Container } from "../../styles/container";
import styled from "styled-components"
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
  & >.todo-content{
    flex: 1;
  }
  & > .todo-delbtn{
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
  }
  `

type TodoItem = {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}
type FilterType = "all" | "active" | "completed"

const Home = ()=>{
  const [todoItems,setTodoItems] = useState< TodoItem[] >([])
  const [filter, setFilter] = useState<FilterType>("all")
  const handleFilterChange = (value: FilterType) => {
    setFilter(value); 
  }
  const filterTodoItems = todoItems.filter((todo) => {
    if (filter === "active") return !todo.status
    if (filter === "completed") return todo.status
    return true
  })
  const handleCheckboxStatus = (id: string) => {
    setTodoItems(todoItems.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    }));
  }
  useEffect(() => {
    const responseData: TodoItem[] = [
      {
        content: "買晚餐",
        createTime: 1743340055,
        id: "-OMb9XcMmDop98NqTNjM",
        status: false
      },
      {
        content: "買早餐",
        createTime: 1743340055,
        id: "-OMb9XcMmDop98NqTNjk",
        status: false
      },
      {
        content: "買午餐",
        createTime: 1743340055,
        id: "-OMb9XcMmDop98NqTNj",
        status: false
      }
    ];
    setTodoItems(responseData);
  }, []); 
  useEffect(() => {
    console.log("todoItems 更新後:", todoItems);
  }, [todoItems]); 
  return(
    <>
      <Container>
        <InputContent>
          <input />
          <button >+</button>
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
              <div className="todo-checkbox" onClick={() => handleCheckboxStatus(item.id)}>
                <p>
                  {item.status? <FontAwesomeIcon icon={faCheck} /> : ""}
                </p>
              </div>
              <div className="todo-content">{item.content}</div>
              <button className="todo-delbtn">刪除按鈕</button>
            </TodoItem>
          ))}
        </TodoContent>
      </Container>
    </>
  )
}

export default Home;