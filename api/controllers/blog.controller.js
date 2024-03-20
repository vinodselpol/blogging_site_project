// import { parse } from 'dotenv'
import Blog from '../models/blog.model.js'
// import { errorHandler } from '../utils/error.js'


//creating a blog
export const createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body)
        return res.status(201).json(blog)
        
        
    } catch (error) {
        next(error)
        
    }
}

//getting all blogs
export const getBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find()
        return res.status(200).json(blogs)

    } catch (error){
        next(error)
    }
}

// Creating a comment
export const createComment = async (req, res, next) => {
    // Assuming the blog post ID, text, and userName are passed in the request body
    const { _id: blogPostId, text, userName } = req.body;

    try {
        // Find the blog post by its ID and update it by adding the new comment to the comments array
        const updatedBlogPost = await Blog.findByIdAndUpdate(
            blogPostId,
            { $push: { comments: { text, userName } } },
            { new: true, runValidators: true } // Options to return the updated document and run schema validators
        );

        if (!updatedBlogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Send back the updated blog post document with the new comment
        res.status(200).json(updatedBlogPost);
    } catch (error) {
        console.error('Error adding comment to blog post:', error);
        // Pass the error to the next middleware (e.g., an error handler)
        next(error);
    }
};


//deleting a blog
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        if (!blog) {
            return res.status(404).json('Blog not found')
        }
        return res.status(200).json('Blog deleted successfully')
    } catch (error) {
        next(error)
    }

}
