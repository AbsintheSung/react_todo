import { breakpoints } from "./variable";
import styled from "styled-components"
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const EmptyText = styled.p`
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 24px;
`
export const ImageContainer = styled.div`
  text-align: center;
  &>img{
    width: 100%;
    @media (min-width: ${breakpoints.md}px) {
      width: 70%;
    }
  }
`
