import { ForwardedRef, forwardRef, RefObject } from "react";
import styled from "styled-components";

const InputStyled = styled.input`
    display: inline-flex;
    flex-grow: 1;
`;

type InputProps = {
    value: string;
    onValueChange: (value: string) => void;
};

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { value, onValueChange } = props;

    return (
        <InputStyled
            ref={ref}
            value={value}
            onChange={(e) => {
                const value = e.currentTarget.value;
                onValueChange(value);
            }}
        />
    );
});
