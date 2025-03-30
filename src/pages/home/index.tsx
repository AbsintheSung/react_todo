import { Container } from "../../styles/container";
import styled from "styled-components"


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
  & > .filter-Btn{
    flex:1;
    padding: 8px 16px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: #FFD370;
      border-bottom: 1px solid #000000;
    }
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


const Home = ()=>{
  return(
    <>
      <Container>
        <InputContent>
          <input />
          <button >+</button>
        </InputContent>

        <FilterContent>
          <button className="filter-Btn" >
            全部
          </button>
          <button className="filter-Btn">
            未完成
          </button>
          <button className="filter-Btn">
            已完成
          </button>
        </FilterContent>
        <TodoContent>
          <TodoItem>
            <div className="todo-checkbox">
              <p></p>
            </div>
            <div className="todo-content">內容內容內容內容內容</div>
            <button className="todo-delbtn">刪除按鈕</button>
          </TodoItem>
        </TodoContent>
      </Container>
    </>
  )
}

export default Home;