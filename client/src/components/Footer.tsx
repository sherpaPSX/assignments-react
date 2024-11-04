import React, { useMemo } from "react";
import styled from "styled-components";
import { useGetTodosQuery } from "../services/todosApi";

const FooterStyled = styled.footer`
    display: flex;
    gap: 1rem;
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
    const { data } = useGetTodosQuery();

    const countedDoneItems = useMemo(() => {
        if (!data) return 0;
        return data?.filter((item) => item.isDone).length;
    }, [data]);

    return (
        <FooterStyled>
            <span>Todo: {data?.length || 0}</span>
            <span>Done: {countedDoneItems}</span>
        </FooterStyled>
    );
};
