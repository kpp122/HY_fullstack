import { useField } from '../hooks';
import { newBlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../reducers/notificationReducer';

const CreateBlog = () => {
  const { reset: resetTitle, ...title } = useField('');
  const { reset: resetAuthor, ...author } = useField('');
  const { reset: resetUrl, ...url } = useField('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    try {
      dispatch(newBlog(blog, user));
      dispatch(
        notification(
          {
            message: `a new blog ${blog.title} by ${blog.author} added`,
            state: true,
          },
          5
        )
      );
    } catch (exception) {
      dispatch(
        notification(
          {
            message: exception.response.data.error,
            state: false,
          },
          5
        )
      );
    }
    resetTitle('');
    resetAuthor('');
    resetUrl('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>create new</h1>
        <div className="form-group">
          <label htmlFor="createBlog-title">Title</label>
          <input
            className="form-control"
            {...title}
            placeholder="title"
            id="createBlog-title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="createBlog-author">Author</label>
          <input
            className="form-control"
            {...author}
            placeholder="author"
            id="createBlog-author"
          />
        </div>
        <div className="form-group">
          <label htmlFor="createBlog-url">url</label>
          <input
            className="form-control"
            {...url}
            placeholder="url"
            id="createBlog-url"
          />
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          id="createBlog-button"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
