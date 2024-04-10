// import { Spinner } from "flowbite-react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// export default function PostPage() {
//   const { postSlug } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
//         const data = await res.json();
//         if (!res.ok) {
//           setError(true);
//           setLoading(false);
//           return;
//         }
//         if (res.ok) {
//           setPost(data.post[0]);
//           setLoading(false);
//           setError(false);
//         }
//       } catch (error) {
//         setError(true);
//         setLoading(false);
//       }
//     };

//   }, [postSlug]);
// if(loading)return(
//     <div className="flex justify-center item-center min-h-screen">
//         <Spinner size='xl'/>
//     </div>
// )
//   return  <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
//     <h1 className="text-3xl mt-10 p-3 text-center  font-serif max-w-2xl mx-auto lg:text-4xl ">  {post && post.title} </h1>

//   </main>
// }

import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "./CallToAction";
import CommentSection from "./CommentSection";
import PostCard from "./PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]); // Use data.posts instead of data.post
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost(); // Don't forget to call the fetchPost function
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center item-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center  font-serif max-w-2xl mx-auto lg:text-4xl ">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="yellow" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className=" flex justify-between p-3 border-b border-slate-600 mx-auto w-full max-w-2xl text-xs">
        <span> {post && new Date(post.createdAt).toLocaleDateString()} </span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read{" "}
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className=" flex flex-col justify-center items-center m-5  ">
        <h1>Resent Articales and Blogs</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center ">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}


 