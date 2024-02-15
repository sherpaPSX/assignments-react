import React from "react";
import styled from "styled-components";

const StyledDiv = styled.footer`
    display: flex;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
`;

type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer = (props: FooterProps) => {
    const { todoItems, doneItems } = props;

    return (
        <StyledDiv>
            Todo: {todoItems}
            Done: {todoItems}
        </StyledDiv>
    );
};
