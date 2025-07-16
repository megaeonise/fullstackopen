import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todo from "./Todo";

const undoneTodo = {
  text: "todo text",
  done: false,
};

const doneTodo = {
  text: "todo text done",
  done: true,
};

test("renders name", () => {
  const mockHandler = vi.fn();
  render(
    <Todo
      todo={undoneTodo}
      onClickComplete={mockHandler}
      onClickDelete={mockHandler}
    />
  );

  const text = screen.getByText("todo text", { exact: false });
  expect(text).toBeDefined();
});

test("can be set as done", async () => {
  const mockHandlerDelete = vi.fn();
  const mockHandlerDone = vi.fn();
  render(
    <Todo
      todo={undoneTodo}
      onClickComplete={mockHandlerDone}
      onClickDelete={mockHandlerDelete}
    />
  );
  const button = screen.getByText("Set as done");
  const text = screen.getByText("This todo is not done", { exact: false });
  expect(button).toBeDefined();
  expect(text).toBeDefined();
});

test("done todos cannot be set as done", async () => {
  const mockHandlerDelete = vi.fn();
  const mockHandlerDone = vi.fn();

  render(
    <Todo
      todo={doneTodo}
      onClickComplete={mockHandlerDone}
      onClickDelete={mockHandlerDelete}
    />
  );
  expect(() => screen.getByText("Set as done").toThrow());
});

test("undone todos can be deleted", async () => {
  const mockHandlerDelete = vi.fn();
  const mockHandlerDone = vi.fn();
  render(
    <Todo
      todo={undoneTodo}
      onClickComplete={mockHandlerDone}
      onClickDelete={mockHandlerDelete}
    />
  );
  const button = screen.getByText("Delete");
  const text = screen.getByText("This todo is not done", { exact: false });
  expect(text).toBeDefined();
  expect(button).toBeDefined();
});

test("done todos can be deleted", async () => {
  const mockHandlerDelete = vi.fn();
  const mockHandlerDone = vi.fn();
  render(
    <Todo
      todo={doneTodo}
      onClickComplete={mockHandlerDone}
      onClickDelete={mockHandlerDelete}
    />
  );
  const button = screen.getByText("Delete");
  const text = screen.getByText("This todo is done", { exact: false });
  expect(text).toBeDefined();
  expect(button).toBeDefined();
});
