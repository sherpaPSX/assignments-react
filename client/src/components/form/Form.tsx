import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { Input } from "./Input";
import { Button } from "../Button";

const FormStyled = styled.form`
    display: flex;
    gap: 0.5rem;
    flex-grow: 1;
`;

type FormProps = {
    initialValue: string;
    onSubmit: (value: string) => void;
    onCancel: () => void;
    isVisible: boolean;
};

export const Form = (props: FormProps) => {
    const { initialValue, onSubmit, onCancel, isVisible } = props;
    const [inputValue, setInputValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isVisible) inputRef.current?.focus();
    }, [isVisible]);

    return (
        <FormStyled
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(inputValue);
            }}
            onReset={() => {
                onCancel();
            }}
        >
            <Input value={inputValue} onValueChange={(value) => setInputValue(value)} ref={inputRef} />
            <Button type={"submit"} variant="primary">
                <CheckIcon />
            </Button>
            <Button type={"reset"} variant="error" onClick={() => onCancel()}>
                <Cross1Icon />
            </Button>
        </FormStyled>
    );
};
