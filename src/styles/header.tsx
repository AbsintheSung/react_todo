import styled from "styled-components"
import { breakpoints } from "./variable";

export const HeaderContainer = styled.header`
  font-weight: bolder;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  & > .icon-box{
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    transform: rotate(-15deg);
    &::after {
      content: '';
      position: absolute;
      width: 15px;
      height: 10px;
      border-left: 4px solid black;
      border-bottom: 4px solid black;
      transform: translateY(-5px) rotate(-45deg);
      top: 5px;
      left: 3px;
    }
  }
  & > h1{
    font-size: 16px;
    margin: 0;
    color: black;
  }
`

export const NavList = styled.ul`
  margin: 0px;
  padding: 0px;
  display: flex;
  align-items: center;
  gap: 16px;
  & > li{
    list-style: none;
    & > .user-Info{
      display: none;
      @media (min-width: ${breakpoints.sm}px) {
        display: block;
        margin: 0px;
      }
    }
    & > .signout-btn{
    padding: 0;
    font-weight: bolder;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
      text-decoration: underline;
    }
  }
  }
`
