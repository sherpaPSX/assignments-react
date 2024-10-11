import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Checkbox } from "./Checkbox";
import { Form } from "./form";
import { useUpdateTodoMutation } from "../services/todosApi";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    margin-left: 15px;
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
                    <button onClick={() => onItemDelete()}>
                        <TrashIcon />
                    </button>
                    <button onClick={() => setIsFormVisible(true)}>
                        <Pencil1Icon />
                    </button>
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
