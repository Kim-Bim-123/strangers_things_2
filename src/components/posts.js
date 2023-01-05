import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiCall } from "../api";

const method = "DELETE";

const matchPost = (post, searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();
    const{
        description,
        location,
        title,
        author: { username },
    } = post;

    const match = [description, location, title, username]

    for (let i= 0; i< match.length; i++) {
        const field = match[i];
        if (field.toLowerCase().includes(searchTermLower)) {
            return true;
        }
    }
};

const Posts= ({ posts, token, setPosts, userData }) => {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    const toDisplay = posts.filter(post => matchPost(post, searchTerm));

    const handleSubmit = async (postId) => {
        const API_URL = `posts/${postId}`;
        // event.preventDefault();
        try {
            await apiCall({
                url: API_URL,
                method: method,
                token: token
            });
            const postsRemainder = posts.filter(post => post._id !== postId);
            setPosts(postsRemainder);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
                <div id="posts-nav">
            <h2 className='page-title'>Posts</h2>
            <input
            type="text"
            placeholder='Search Posts'
            value={searchTerm}
            onChange={(event) => {
                setSearchTerm(event.target.value);
            }}
            ></input>
        </div>
        {toDisplay.length ? (
            toDisplay.map((posts) => (
                <div 
                className='post-info'
                key={posts._id}
                style={{ border: "2px solid black"}}
                >
                    <div id='title-button'>
                        <span className='post-title'>{posts.title}</span>
                        <button onClick={() => history.push(`/posts/${posts._id}`)}>
                            Tell Me MORE !
                        </button>
                    </div>
                    <div id='seller'> Seller: {posts.author.username}</div>
                    <div className='location'>Location: ${posts.location}</div>
                    <div className='description'>Description: {posts.description}</div>

                    {posts.author.username === userData.username ? (
                        <button onClick={() => handleSubmit(posts.id)}>
                            Delete Post
                        </button>
                    ) : null}
                </div>
            ))
    ) : ( 
        <div>
            <h1>There are no matching posts...</h1>
        </div>
        )}
        </>
    );
};

export default Posts;