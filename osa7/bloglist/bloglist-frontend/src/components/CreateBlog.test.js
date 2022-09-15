import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateBlog from './CreateBlog';

describe('New blogs gets created correctly', () => {
  test('<CreateBlog /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup();
    const createBlog = jest.fn();

    render(<CreateBlog newBlog={createBlog} />);

    const authorInput = screen.getByPlaceholderText('author');
    const titleInput = screen.getByPlaceholderText('title');
    const urlInput = screen.getByPlaceholderText('url');
    const button = screen.getByText('Create');

    await user.type(authorInput, 'test author');
    await user.type(titleInput, 'test title');
    await user.type(urlInput, 'test url');
    await user.click(button);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].author).toBe('test author');
    expect(createBlog.mock.calls[0][0].title).toBe('test title');
    expect(createBlog.mock.calls[0][0].url).toBe('test url');
  });
});
