import styled from "styled-components";
import { useDeleteTodoMutation, useGetTodosQuery, useFinishTodoMutation } from "../services/todosApi";
import { ListItem } from "./ListItem";

const StyledList = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const List = () => {
    const { data } = useGetTodosQuery();
    const [deleteItemHandler] = useDeleteTodoMutation();
    const [finishItemHandler] = useFinishTodoMutation();

    return (
        <StyledList>
            {data?.map(({ isDone, label, id }) => (
                <ListItem
                    key={id}
                    id={id}
                    isDone={isDone}
                    label={label}
                    onItemDelete={() => deleteItemHandler({ id })}
                    onItemDoneToggle={() => finishItemHandler({ id, isDone: !isDone })}
                />
            ))}
        </StyledList>
    );
};
