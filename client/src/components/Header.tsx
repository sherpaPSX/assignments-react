import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.header`
    display: flex;
    button {
        all: unset;
        border-radius: 50%;
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.olive9};
        background-color: ${(props) => props.theme.colors.grass9};
        color: #fff;
        width: 25px;
        height: 25px;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    handleAddItem: () => void;
};

export const Header = (props: HeaderProps) => {
    const { children, handleAddItem } = props;

    return (
        <StyledDiv>
            <h1>{children}</h1>
            <button onClick={() => handleAddItem()}>
                <PlusIcon />
            </button>
        </StyledDiv>
    );
};
