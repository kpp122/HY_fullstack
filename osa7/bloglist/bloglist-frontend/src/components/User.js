import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const userId = useParams().id;
  const user = useSelector((state) =>
    state.user.find((user) => user.id === userId)
  );

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul className="list-group">
        {user.blogs.map((blog) => (
          <li className="list-group-item" key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
