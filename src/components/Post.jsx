import {
  useParams,
  Navigate,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

const Post = () => {
  const params = useParams();

  const isEmpty =
    Object.keys(params).length < 2 &&
    Object.getPrototypeOf(params) === Object.prototype;

  const navigate = useNavigate();

  const onClick = () => {
    console.log("Hello");
    navigate("/about");
  };

  const status = 200;

  // redirect
  if (status === 404) {
    return <Navigate to="/notfound" />;
  }

  return (
    <div>
      {isEmpty ? (
        <>
          <h1>Post</h1>
          <button onClick={onClick}>About</button>
          <Routes>
            <Route path="/show" element={<h1>Showing his padh</h1>} />
          </Routes>
        </>
      ) : (
        <>
          <h1>Post {params.id}</h1>
          <p>Name: {params.name}</p>
        </>
      )}
    </div>
  );
};

export default Post;
