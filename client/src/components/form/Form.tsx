import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import styled from "styled-components";

import { Input } from "./Input";

const FormStyled = styled.form`
    display: flex;
`;

type FormProps = {
    initialValue: string;
    handleSubmit: (data: string) => void;
    handleCancel: () => void;
};

export const Form = (props: FormProps) => {
    const { initialValue, handleSubmit, handleCancel } = props;

    const [data, setData] = useState(initialValue);

    return (
        <FormStyled
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(data);
            }}
            onReset={() => {
                handleCancel();
            }}
        >
            <Input initialValue={initialValue} handleInputChange={(value) => setData(value)} />
            <button type={"submit"}>
                <CheckIcon />
            </button>
            <button type={"reset"}>
                <Cross1Icon />
            </button>
        </FormStyled>
    );
};
