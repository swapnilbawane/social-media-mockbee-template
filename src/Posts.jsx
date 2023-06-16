import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export function Posts() {
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("/api/posts");
      console.log("res from posts first", res);
      const data = await res.data.posts;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (id) => {
    try {
      let encodedToken = localStorage.getItem("encodedToken");

      const routeURL = `/api/posts/like/${id}`;
      console.log("Route url", routeURL);

      const res = await fetch(`${routeURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${encodedToken}`,
        },
      });

      if (res.status === 201) {
        const postData = await res.json();
        console.log("postData", postData);
        setPosts(postData.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookmarkPost = async (id) => {
    try {
      let encodedToken = localStorage.getItem("encodedToken");

      const routeURL = `/api/users/bookmark/${id}`;
      console.log("Route url", routeURL);

      const res = await fetch(`${routeURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${encodedToken}`,
        },
      });

      console.log("res from posts after bookmark", res);

      if (res.status === 200) {
        const postData = await res.json();
        console.log("postData", postData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2> Hello posts </h2>
      <div>
        {posts?.map((item) => {
          console.log("item id", item._id);
          return (
            <div key={item._id}>
              {item.username}
              <p>{item.content}</p>

              <div>
                {item.likes.likeCount === 0 ? (
                  <button onClick={() => likePost(item._id)}> Like </button>
                ) : (
                  <button onClick={() => console.log("unlike")}>UnLike</button>
                )}
                <button onClick={() => bookmarkPost(item._id)}>
                  {" "}
                  Bookmark{" "}
                </button>
              </div>

              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}
