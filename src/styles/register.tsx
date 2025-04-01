import styled from "styled-components";
import { breakpoints } from "./variable";

export const RegisterContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > h2 {
    width: 100%;
    text-align: center;
  }
`

export const FormRegister = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px 0px;
  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 4px 0px;
    & > label {
      width: 100%;
      text-align: start;
    }
    & > input {
      width: 100%;
      border-radius: 10px;
      padding: 12px 16px;
      border: none;
      &:focus {
        outline: none;
      }
    }
  }
  & > .register-btn-group{
    gap:20px 0px;
    font-weight: bolder;
    & > .register-btn{
      padding: 12px 48px;
      background-color: black;
      color:white;
      border-radius: 10px;
      border: none;
    }
    & > .register-link{
      text-decoration: none;
      color: black;
    }
   
  }
  @media (min-width: ${breakpoints.md}px) {
    width: 70%;
  }
`

export const RegisterError = styled.p<{ $isVisible: boolean }>`
  position: relative;
  margin: 0px;
  padding: 8px 0px;
  width: 100%;
  font-size: 14px;
  font-weight: bolder;
  color: red;
  
  & > span {
    position: absolute;
    top: 0;
    right: 0;
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    transition: opacity 0.2s ease;
  }
`;