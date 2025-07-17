import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url or number of likes by default', () => {
  const blog = {
    title: 'This is the title',
    author: 'Google Author',
    url: 'www.google.com',
    likes: 25
  }

  render(<Blog blog={blog}/>)

  const title = screen.getByText('This is the title', { exact:false })
  const author = screen.getByText('Google Author', { exact:false })
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(() => screen.getByText('www.google.com').toThrow())
  expect(() => screen.getByText('likes', { exact:false }).toThrow())
})

test('renders url and number of likes when view is clicked', async () => {
  const blog = {
    title: 'This is the title',
    author: 'Google Author',
    url: 'www.google.com',
    likes: 25
  }

  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('www.google.com')
  const likes = screen.getByText('likes 25')
  expect(() => url.toBeDefined())
  expect(() => likes.toBeDefined())
})

test('when the like button is clicked twice, the event handler recieved by the component is called twice', async () => {
  const blog = {
    title: 'This is the title',
    author: 'Google Author',
    url: 'www.google.com',
    likes: 25
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} blogRefresh={mockHandler} token={''}/>)

  const user = userEvent.setup()
  const view_button = screen.getByText('view')
  await user.click(view_button)
  const like_button = screen.getByText('like')
  await user.click(like_button)
  await user.click(like_button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})