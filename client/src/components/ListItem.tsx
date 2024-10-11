import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { Form } from "./form";
import { useUpdateTodoMutation } from "../services/todosApi";
import { Button } from "./Button";

const Label = styled.label`
    margin-left: 15px;
`;

const ItemActions = styled.div`
    display: inline-flex;
    gap: 0.5rem;
    position: relative;
    opacity: 0;
    transition: ease all 0.25s;
    right: -1rem;
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-between;

    ${Label} {
        margin-right: auto;
    }

    &:hover ${ItemActions} {
        opacity: 1;
        right: 0;
    }
`;

export type LiteeItemProp = {
    id: string;
    label: string;
    isDone: boolean;
    onItemDoneToggle: (isDone: boolean) => void;
    onItemDelete: () => void;
};

export const ListItem = (props: LiteeItemProp) => {
    const { id, label, isDone, onItemDoneToggle, onItemDelete } = props;
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [updateTodoHandler, { isSuccess }] = useUpdateTodoMutation();

    useEffect(() => {
        setIsFormVisible(false);
    }, [isSuccess]);

    return (
        <StyledDiv>
            {!isFormVisible ? (
                <>
                    <Checkbox checked={isDone} onCheckedChange={onItemDoneToggle} />
                    <Label>{label}</Label>
                    <ItemActions>
                        <Button variant="error" onClick={() => onItemDelete()}>
                            <TrashIcon />
                        </Button>
                        <Button variant="primary" onClick={() => setIsFormVisible(true)}>
                            <Pencil1Icon />
                        </Button>
                    </ItemActions>
                </>
            ) : (
                <Form
                    initialValue={label}
                    onCancel={() => setIsFormVisible(false)}
                    onSubmit={(value) => updateTodoHandler({ id, label: value })}
                />
            )}
        </StyledDiv>
    );
};
