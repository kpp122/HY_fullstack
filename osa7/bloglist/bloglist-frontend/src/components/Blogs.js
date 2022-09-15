import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) =>
    [...state.blog].sort((a, b) => b.likes - a.likes)
  );

  return (
    <div>
      <table className="table table-striped table-bordered">
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
