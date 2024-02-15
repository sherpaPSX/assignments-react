import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
    ${normalize}
    ${reset}
    
    :root {
       font-family: Inter, sans-serif;
       font-feature-settings: 'liga' 1, 'calt' 1; /* fix for Chrome */
    }

    @supports (font-variation-settings: normal) {
      :root { font-family: InterVariable, sans-serif; }
    }
`;
