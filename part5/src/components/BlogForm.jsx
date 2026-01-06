export const BlogForm = ({addBlog, newBlog, handleBlogChange}) => (
    <form onSubmit={addBlog}>
        <input value={newBlog} onChange={handleBlogChange} />
        <button type="submit">save</button>
    </form>
)