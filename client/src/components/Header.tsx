import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "./form";
import { useAddTodoMutation } from "../services/todosApi";
import { Button } from "./Button";

const StyledDiv = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};
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
                    <Button variant="success" onClick={() => setIsFormVisible(true)}>
                        <PlusIcon />
                    </Button>
                </>
            ) : (
                <Form
                    onSubmit={(label) => addTodoHandled({ label })}
                    onCancel={() => setIsFormVisible(false)}
                    isVisible={isFormVisible}
                    initialValue=""
                />
            )}
        </StyledDiv>
    );
};
