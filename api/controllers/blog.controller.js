// import { parse } from 'dotenv'
import Blog from '../models/blog.model.js'
// import { errorHandler } from '../utils/error.js'
import nodemailer from "nodemailer";
import User from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);

        // Notify subscribers right after the blog post is created successfully
        notifySubscribers(blog)
        .then(() => {
            console.log('Subscribers notified');
        })
        .catch(error => {
            // Log the error but do not disrupt the blog creation flow
            console.error('Error notifying subscribers:', error);
        });

        return res.status(201).json(blog);
        
    } catch (error) {
        next(error);
    }
};

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


// Set up your transporter
const transporter = nodemailer.createTransport(
    // Configuration depending on your email service
    {
        service: 'gmail',
        port: 587, // Commonly, 587 for TLS or 465 for SSL
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAL_APP_PASSWORD,
        },
    }
  );


 const notifySubscribers = async (post) => {
    const subscribers = await User.find({ subscriptions: post.topic });
    console.log('subscribers', subscribers);
  
    subscribers.forEach(subscriber => {
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: subscriber.email,
        subject: `New post in ${post.topic}`,
        text: `Hello, 

Check out our latest post in the ${post.topic} section:

${post.title}

${post.content}

`, // Replace with your logic to generate post URL if not present in the post object
    html: `<p>Hello,</p>
           <p>Check out our latest post in the <strong>${post.topic}</strong> section:</p>
           <h2>${post.title}</h2>
           <p>${post.content}</p>
           `, 
  }, (error, info) => {
        if (error) {
          console.error(`Failed to send email to ${subscriber.email}`, error);
        } else {
          console.log(`Email sent to ${subscriber.email}: ${info.response}`);
        }
      });
    });
  }
