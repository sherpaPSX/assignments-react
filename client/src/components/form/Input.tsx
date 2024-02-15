import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input``;

type InputProps = {
    initialValue: string;
    handleInputChange: (value: string) => void;
};

export const Input = (props: InputProps) => {
    const { initialValue, handleInputChange } = props;

    const [value, setValue] = useState(initialValue);

    return (
        <StyledInput
            value={value}
            onChange={(e) => {
                const value = e.currentTarget.value;
                setValue(value);
                handleInputChange(value);
            }}
        />
    );
};
