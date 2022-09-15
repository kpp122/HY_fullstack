import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog component is rendered correctly', () => {
  let blogComponent;

  const user = {
    username: 'superuser',
    name: 'name',
  };

  const blog = {
    title: 'Jest testing',
    author: 'Reacthor',
    url: 'localhost',
    likes: 1,
    user: user,
  };
  const mockHandler1 = jest.fn();
  const mockHandler2 = jest.fn();

  beforeEach(() => {
    blogComponent = render(
      <Blog blog={blog} updateLikes={mockHandler1} removeBlog={mockHandler2} />
    ).container;
  });

  test('Blog component initially shows only author and title', () => {
    const title = screen.getByText('Jest testing', { exact: false });
    const author = screen.getByText('Reacthor', { exact: false });
    expect(title).toBeDefined();
    expect(author).toBeDefined();

    const div = blogComponent.querySelector('.blogHiddenContent');
    expect(div).toHaveStyle('display: none');
  });

  test('Blog component shows hidden content after clicking button', async () => {
    const jestUser = userEvent.setup();
    const button = screen.getByText('view');
    await jestUser.click(button);

    const div = blogComponent.querySelector('.blogHiddenContent');
    const url = screen.getByText('localhost');
    const name = screen.getByText('name');

    expect(url).toBeDefined();
    expect(name).toBeDefined();
    expect(div).not.toHaveStyle('display : none');
  });

  test('Blog component calls updateLikes correctly', async () => {
    const jestUser = userEvent.setup();
    const button = screen.getByText('vote');
    await jestUser.click(button);
    await jestUser.click(button);

    expect(mockHandler1.mock.calls).toHaveLength(2);
  });
});
