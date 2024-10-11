import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "./form";
import { useAddTodoMutation } from "../services/todosApi";

const StyledDiv = styled.header`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};

    button {
        all: unset;

        width: 25px;
        height: 25px;

        background-color: ${(props) => props.theme.colors.grass9};
        border: 1px solid;
        border-color: ${(props) => props.theme.colors.olive9};
        border-radius: 50%;

        color: #fff;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = (props: HeaderProps) => {
    const { children } = props;
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [addTodoHandled, { isSuccess }] = useAddTodoMutation();

    useEffect(() => {
        setIsFormVisible(false);
    }, [isSuccess]);

    return (
        <StyledDiv>
            {!isFormVisible ? (
                <>
                    <h1>{children}</h1>
                    <button onClick={() => setIsFormVisible(true)}>
                        <PlusIcon />
                    </button>
                </>
            ) : (
                <Form
                    onSubmit={(label) => addTodoHandled({ label })}
                    onCancel={() => setIsFormVisible(false)}
                    initialValue=""
                />
            )}
        </StyledDiv>
    );
};
