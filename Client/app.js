function App() {
  const [posts, setPosts] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [editId, setEditId] = React.useState(null);

  const loadPosts = async () => {
    const res = await fetch("http://localhost:8000/posts");
    setPosts(await res.json());
  };

  React.useEffect(() => { loadPosts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`http://localhost:8000/posts/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
    } else {
      await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
    }
    setTitle(""); setBody(""); setEditId(null);
    loadPosts();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/posts/${id}`, { method: "DELETE" });
    loadPosts();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setEditId(post.id);
  };

  return (
    <div style={{ width: 500, margin: "20px auto", fontFamily: "Arial" }}>
      <h1>Simple Blog</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ width:"100%", margin:"5px 0" }} />
        <textarea placeholder="Body" value={body} onChange={e => setBody(e.target.value)} required style={{ width:"100%", margin:"5px 0" }} />
        <button type="submit">{editId ? "Update" : "Create"} Post</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setTitle(""); setBody(""); }}>Cancel</button>}
      </form>

      <h2>All Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border:"1px solid #ccc", padding:10, margin:"10px 0" }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => handleEdit(post)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
