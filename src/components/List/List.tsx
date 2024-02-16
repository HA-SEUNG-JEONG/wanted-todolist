// /src/components/List.tsx

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addTodo, removeTodo } from "../../store/todo";
import styled from "styled-components";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TodoListContainer = styled.div`
    max-width: 400px;
    margin: 0 auto;
`;

const TodoItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ccc;

    &:last-child {
        border-bottom: none;
    }
`;

const Form = styled.form`
    display: flex;
    width: 100%;
    justify-content: center;
    height: 100%;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
`;

const List = () => {
    const todos = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();

    const [value, setValue] = useState("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(event);
        event.preventDefault();
        dispatch(addTodo(value));
        setValue("");
    };

    const handleRemove = async (index: number) => {
        const result = await Swal.fire({
            icon: "question",
            title: "정말로 삭제하시겠습니까?"
        });
        if (result.isConfirmed) {
            dispatch(removeTodo(index));
            toast.success("삭제되었습니다.");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TodoListContainer>
            <Form onSubmit={onSubmit}>
                <input
                    value={value}
                    onChange={handleChange}
                    placeholder="할 일을 입력하세요."
                />
                <Button type="submit">추가</Button>
            </Form>
            {todos?.todos.map((todo, index) => (
                <TodoItem key={index}>
                    {todo}
                    <button onClick={() => handleRemove(index)}>삭제</button>
                </TodoItem>
            ))}
        </TodoListContainer>
    );
};

export default List;
