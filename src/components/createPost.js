import React, { useState } from 'react';
import { apiCall } from "../api"
import { useHistory, useParams } from "react-router-dom";

const CreatePost = ({ token, setPosts, posts, action }) => {
    const history = useHistory();
    const { postId } = useParams();
    const [newPosts, setNewPosts] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        willDeliver: false,
    });
    const isEdit = action === "edit";
    const title = isEdit ? "Edit This Post" : "Add a New Post";
    const method = isEdit ? "PATCH" : "POST";
    const API_ROOT = isEdit ? `/posts/${postId}` : `/posts`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {
                data: { posts },
            } = await apiCall({
                url: API_ROOT,
                method: method,
                body: {
                    post: {
                        title: newPosts.title,
                        description: newPosts.description,
                        price: newPosts.price,
                        location: newPosts.location,
                        willDeliver: newPosts.willDeliver,
                    },
                },
                token,
            });

            if (isEdit) {
                const filteredPosts = posts.filter((posts) => posts.id !== postId);
                setPosts([...posts, posts]);
            } else {
                setPosts([...posts, posts]);
            }
            history.push("/posts");
        } catch (error) {
            console.error("Error adding your post:", error);
        }
    };

    const handlePostFieldChange = (property) => (event) => {
        if(property === "willDeliver") {
            setNewPosts({...newPosts, [property]: event.target.checked });
        } else {
            setNewPosts({...newPosts, [property]: event.target.value});
        }
    };



    return (
        <>
        <h2>{title}</h2>
        <form id='new-post-form' onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder='What are you listing?'
            onChange={handlePostFieldChange("title")}
            value={newPosts.price}></input>
            <input 
            type="text"
            placeholder='Where are you selling from?'
            onChange={handlePostFieldChange("location")}
            value={newPosts.location}></input>
        </form>
        </> 
    );
};

export default CreatePost;