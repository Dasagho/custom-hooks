import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const initialState = [];

const init = () => {
  return JSON.parse(localStorage.getItem("todos") || []);
};

export const useTodo = () => {
  const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);
  const todosCount = todos.length;
  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  // Las acciones reduce del reducer son puramente sincronas y
  // son funciones puras por tanto como queremos que cada vez que
  // cambie el estado de la lista todos se haga algo, se ejecute
  // un "efecto secundario"
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos) /* || [] */);
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "Add Todo",
      payload: todo,
    };

    dispatchTodo(action);
  };

  const handleDeleteTodo = (id) => {
    dispatchTodo({
      type: "Remove Todo",
      payload: id,
    });
  };

  const handleToggleTodo = (id) => {
    dispatchTodo({
      type: "Toggle Todo",
      payload: id,
    });
  };

  return {
    todos,
    todosCount,
    pendingTodosCount,
    handleNewTodo,
    handleToggleTodo,
    handleDeleteTodo,
  };
};
