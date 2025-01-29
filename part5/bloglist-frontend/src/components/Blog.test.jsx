import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

test('renders title and author but not url or number of likes by default', () => {
  const blog = {
    title: 'This is the title',
    author: 'Google Author',
    url: 'www.google.com',
    likes: 25
  }
  const blogRefresh = () => {
    console.log('Refreshing Blog')
  }
  const token = 'token'


  render(<Blog blog={blog} token={token} blogRefresh={blogRefresh} />)

  screen.debug()

  const title = screen.getByText('This is the title', {exact:false})
  const author = screen.getByText('Google Author', {exact:false})
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(() => screen.getByText('www.google.com').toThrow())
  expect(() => screen.getByText('likes', {exact:false}).toThrow())
})