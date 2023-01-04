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
    
}