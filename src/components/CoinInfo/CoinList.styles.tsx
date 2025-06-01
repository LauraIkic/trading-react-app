import styled from "styled-components";
import { myTheme } from "../../theme/theme";

type MyTheme = typeof myTheme;

export const TableWrapper = styled.div<{ theme?: MyTheme }>`
  background-color: ${({ theme }) => theme?.colors?.background || '#866cee'};
  padding: ${({ theme }) => theme?.spacing?.(4) || '2rem'};
  font-family: sans-serif;
`;

export const StyledHeading = styled.h1<{ theme?: MyTheme }>`
  color: ${({ theme }) => theme?.colors?.primary || '#2e2e2e'};
`;

export const StyledLink = styled.a<{ theme?: MyTheme }>`
  color: ${({ theme }) => theme?.colors?.accent ||  '#866cee'};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
