// import React, { useState } from "react";
// import reactTrixRte from "react-trix-rte";

// function Post() {
//     const [value, setValue] = useState("");

//   function handleChange(event, newValue) {
//     setValue(newValue); // OR custom on change listener.
//   }

//   return (
//     <div>
//             <p className="post-title">{post.title}</p><span>{post.created_at}</span>
//                 <p>{post.username} </p>
//                     {post.username === me.username ? (
//                     <div>
//                     <button onClick={handleEditClick}>Edit Post</button>
//                     <button onClick={onDelete} value={post.id}>Delete</button>
//                     </div>
//                     ) : null }
//                 <div>
//                 {post.content.substring(0,500)}
//                 </div>
//         </div>
//   )
// };

// export default Post;