import Todo from "./Todo";

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickComplete = (todo) => () => {
    completeTodo(todo);
  };

  return (
    <>
      {todos
        .map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onClickComplete={onClickComplete}
            onClickDelete={onClickDelete}
          />
        ))
        // eslint-disable-next-line react/jsx-key
        .reduce((acc, cur) => [...acc, <hr key={Math.random()} />, cur], [])}
    </>
  );
};

export default TodoList;
