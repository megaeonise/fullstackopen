import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("form calls event handler it receives as props with right details", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);

  const title = container.querySelector(".title");
  const author = container.querySelector(".author");
  const url = container.querySelector(".url");
  const createButton = screen.getByText("create");

  await user.type(title, "This is the title");
  await user.type(author, "Author McAuthor");
  await user.type(url, "www.author.net");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("This is the title");
  expect(createBlog.mock.calls[0][0].author).toBe("Author McAuthor");
  expect(createBlog.mock.calls[0][0].url).toBe("www.author.net");
});
