import styled from "styled-components";
import { breakpoints } from "./variable";

export const LoginContent = styled.div`
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

export const FormLogin = styled.form`
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
      /* border: none; */
      &:focus {
        outline: none;
      }
    }
  }
  @media (min-width: ${breakpoints.md}px) {
    width: 70%;
  }
`