import {
  removeBlog,
  updateBlog,
  initializeBlogs,
  createComment,
} from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../reducers/notificationReducer';
import { useParams } from 'react-router-dom';
import { useField } from '../hooks/index';

const Blog = () => {
  const { reset: resetComment, ...comment } = useField('text');
  const blogId = useParams().id;
  const blog = useSelector((state) =>
    state.blog.find((blog) => blog.id === blogId)
  );
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleButton = () => {
    const newBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      url: blog.url,
      user: blog.user.id,
    };

    try {
      dispatch(updateBlog(blog.id, newBlog));
      dispatch(initializeBlogs());
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
  };

  const handleRemove = () => {
    const blogObject = {
      author: blog.author,
      title: blog.title,
      id: blog.id,
    };
    if (
      window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        dispatch(removeBlog(blogObject));
        dispatch(
          notification(
            { message: `blog ${blogObject.title} removed`, state: true },
            4
          )
        );
      } catch (exception) {
        console.log(exception);
      }
    }
  };

  const handleComment = (id) => {
    dispatch(createComment(id, { comment: comment.value }));
    resetComment();
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} by {blog.author}{' '}
        </h2>
      </div>
      <a href={`https://${blog.url}`}>{blog.url}</a>
      <br />
      <span>likes </span>
      <span className="blogLike">{blog.likes} </span>
      <button
        className="btn btn-primary"
        onClick={handleButton}
        id="blog-likeButton"
      >
        vote
      </button>
      <br />
      <span>Added by {blog.user.name}</span>
      <h3>Comments</h3>
      <input {...comment} />{' '}
      <button
        className="btn btn-primary"
        onClick={() => handleComment(blog.id)}
      >
        Add comment
      </button>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
      {user && user.username === blog.user.username && (
        <div style={{ marginTop: 30 }}>
          <button
            className="btn btn-primary"
            onClick={handleRemove}
            id="blog-removeButton"
          >
            remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
