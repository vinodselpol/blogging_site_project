import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author:{
        type: String,
        required: true, 
    },
    content:{
        type: String,
        required: true, 
    },
    title:{
        type: String,
        required: true, 
    },
    topic:{
        type:String,
        required: true,
    },
    comments: [{
        text: {
            type: String,
        },
        userName: {
            type: String,
        }
    }],
    // imageUrls:{
    //     type:Array,
    //     // required: true,
    // },
    // userRef:{
    //     type:String,
    //     // required: true,
    //     default: "admin"
    // },

}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema)

export default Blog;