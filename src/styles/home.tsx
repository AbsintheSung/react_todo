import styled from "styled-components"

export const InputContent = styled.div`
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

export const FilterContent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`
export const FilterButton =  styled.button<{ $active: boolean }>`
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

export const TodoContent = styled.ul`
  padding: 16px;
`
export const TodoItem = styled.li`
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
  `
export const TodoText = styled.p<{ $status: boolean }>`
  flex: 1;
  margin: 0;
  text-decoration: ${(props) => (props.$status ? "line-through" : "none")};
  color: ${(props) => (props.$status ? "#888" : "#333")};
`
export const ButtonGroup = styled.div`
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