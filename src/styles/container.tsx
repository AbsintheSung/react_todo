import styled from "styled-components";
import { breakpoints } from "./variable";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;
  max-width: 100%;

  @media (min-width: ${breakpoints.ssm}px ) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media (min-width: ${breakpoints.md}px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media (min-width: ${breakpoints.lg}px) {
    padding-left: 24px;
    padding-right: 24px;
    max-width: ${breakpoints.lg}px;
  }

  /* @media (min-width: ${breakpoints.xl}px) {
    padding-left: 32px;
    padding-right: 32px;
    max-width: ${breakpoints.xl}px;
  }

  @media (min-width: ${breakpoints.xxl}px) {
    max-width: ${breakpoints.xxl}px;
  } */
`;