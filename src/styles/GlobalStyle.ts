import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
    }


    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1;
        font-family: 'Nanum Gothic', 'Noto Sans KR', sans-serif;
        background-color: #F4F3EA;
        margin-bottom: 100px;
        line-height: 1.5;
        font-weight: 400;
    }

    h1 {
        margin: 0;  
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button,
    input,
    select,
    textarea {
        background-color: transparent;
        border: 0;
    }

    button:focus,
    input:focus,
    select:focus,
    textarea:focus {
        box-shadow: none;
    }

    a,
    button {
        cursor: pointer;
    }

    ul,
    ol {
        padding: 0;
        list-style: none;
    }
`;

export default GlobalStyle;
