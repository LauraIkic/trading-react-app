// filepath: /Users/aylin/FH Projekte/SYSI/SYI-Gruppenprojekt/trading-react-app/src/components/CoinInfo/CoinList.styles.tsx
import styled, { DefaultTheme } from "styled-components";

export const TableWrapper = styled.div<{ theme: DefaultTheme }>`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing(4)};
  font-family: sans-serif;
`;

export const StyledHeading = styled.h1<{ theme: DefaultTheme }>`
  color: ${({ theme }) => theme.colors.primary};
`;

export const StyledLink = styled.a<{ theme: DefaultTheme }>`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
