// const App = () => {
//     const [posts, setPosts] = useState([]);
    
//     useEffect(() => {
//       const fetchPosts = async() => {
//         const response = await fetch(`${Base_URL}${COHORT_NAME}/posts`)
//           const data = await response.json();
//           setPosts(data.data.posts);
//       }
//     fetchPosts()
//     }, [])
//     return <>
//       <h1>
//         Posts
//       </h1>
//       {
//         posts.map(post => <div key={post.id}>
//           <li>{post.title}
//             {post.description}
//            <ul></ul> 
//           </li>
//         </div>)
//       }
//     </>
//     }