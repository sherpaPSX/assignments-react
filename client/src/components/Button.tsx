import styled, { css } from "styled-components";

export interface ButtonProps {
    variant?: "primary" | "error" | "success";
}

export const Button = styled.button<ButtonProps>`
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    ${(props) =>
        props.variant === "success" &&
        css`
            background-color: blue;
            color: white;
        `}

    ${(props) =>
        props.variant === "primary" &&
        css`
            background-color: blue;
            color: white;
        `}
    ${(props) =>
        props.variant === "error" &&
        css`
            background-color: red;
            color: white;
        `}
        ${(props) =>
        !props.variant &&
        css`
            background-color: gray;
            color: white;
        `};
`;
