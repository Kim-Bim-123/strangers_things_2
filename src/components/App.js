import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
    Account,
    Posts,
    CreatePost,
    Nav,
    Login,
    SinglePost,
    User,
} from "../index.js"
import { apiCall } from "../api/index";


const App = () => {
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);
    
    const fetchUserData = async (token) => {
        const { data } = await apiCall({
            url: "/users/me",
            token,
        });
        return data;
    };

    const fetchPosts = async () => {
        const {
            data: { posts },
        } = await apiCall({
            url: "/posts",
        })
        return posts;
    };
    fetchPosts();

    useEffect(() => {
        async function fetchData() {
            const response = await fetchUserData(token);
        }
        fetchData();
    }, [token]);

    return (
        <>
        <div id="header">
            {userData.username && (
                <p> Welcome to Stranger's Things, happy posting {userData.username}!</p>
            )}
            {!userData.username && <p>Welcome to Stranger's Things, happy posting</p>}
        </div>
        <Nav token={token} />

        { <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/posts">
                <Posts
                posts={posts}
                token={token}
                setPosts={setPosts}
                userData={userData} />
            </Route>
            <Route path="/profile">
                <User userData={userData} token={token} />
            </Route>
            <Route path="/posts/new">
                <CreatePost 
                token={token}
                setPost={setPosts}
                posts={posts}
                action="add"
                />
            </Route>
            <Route path="/posts/:postId/edit">
                <CreatePost 
                token={token}
                setPost={setPosts}
                posts={posts}
                action="edit"
                />
            </Route>
            <Route path="/posts/:postId">
                <SinglePost posts={posts} token={token} />
            </Route>
            <Route path="/register">
            <Account
                action="register"
                setToken={setToken}
                setUserData={setUserData}
                />
            </Route>
            <Route path="/login">
                <Account
                    action="login" 
                    setToken={setToken}
                    setUserData={setUserData}
                    />
            </Route>
        </Switch> }
        </>
    );
};

ReactDOM.render(
    <Router>
        <App/>,
    </Router>,
    document.getElementById("app")
);
