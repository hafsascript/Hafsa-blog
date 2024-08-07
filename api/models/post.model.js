import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'https://content.clipchamp.com/content-repo/content/previews/cc_if8c24e68.jpg?1654746169864'
    },
    category: {
        type: String,
        default: 'Uncategorized'
    },
    slug: {
        type: String,
        required:true,
        unique:true,
    },
    editorChoice: {
        type: Boolean,
        default:false, 
    },
    popular: {
        type: Boolean,
        default:false, 
    },
    
    
}, {timestamps:true})

const Post = mongoose.model('Post', postSchema);

export default Post;