import { React, createContext, useRef, useState } from 'react';
import dateToStr from '../utils/util';
import testTodsoData from './TestTodosData'
const TodosContext = createContext();

export const TodoPrvider = ({ children }) => {

    // const [todos, setTodos] = useState([]);
    // const lastTodoIdRef = useRef(0);

    const [todos, setTodos] = useState([...testTodsoData]);
    const lastTodoIdRef = useRef(testTodsoData.length);

    const addTodo = newContent => {
        const id = ++lastTodoIdRef.current;
        const newTodo = {
            id,
            content: newContent,
            regDate: dateToStr(new Date()),
        };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
    };

    const removeTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id != id);
        setTodos(newTodos);

    }

    const modifyTodo = (id, newContent) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, content: newContent } : todo);
        setTodos(newTodos)
    }

    return (
        <TodosContext.Provider value={{ todos, addTodo, removeTodo, modifyTodo }}>
            {children}
        </TodosContext.Provider>
    )
};

export default TodosContext;