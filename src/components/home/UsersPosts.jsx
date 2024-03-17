import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiDislike, BiLike } from "react-icons/bi";
import { CiSaveDown2 } from "react-icons/ci";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { useAuth } from "../../ContextProvider/AuthContext";
import Loader from "../Loader";
export default function UsersPosts({ posts }) {
  const PostOwnerId = posts[0].userId;

  const { currentUser } = useAuth();

  const ownerdocref = doc(db, "USERS", PostOwnerId);

  const jwt = currentUser.uid;

  const [updatedPosts, setUpdatedPosts] = useState(posts[0].posts || []);

  const currentUserdocref = doc(db, "USERS", jwt);

  const [loading, setLoading] = useState(false);

  const like = async (post) => {
    try {
      setLoading(true);
      const currentuser = await getDoc(currentUserdocref);
      const currentLikedPost = currentuser.data().likedPosts || [];
      const currentDislikedPost = currentuser.data().dislikedPosts || [];
      const userdata = await getDoc(ownerdocref);
      const userPosts = userdata.data().Posts;

      if (currentDislikedPost.includes(post.id)) {
        return;
      }

      if (currentLikedPost.includes(post.id)) {
        const updatePostremoveLike = userPosts.map((item) => {
          if (item.id == post.id) {
            if (item.likes !== 0) {
              return { ...item, likes: item.likes - 1 };
            }
          }
          return item;
        });

        await updateDoc(ownerdocref, {
          Posts: updatePostremoveLike,
        });

        const filterPostWithoutId = currentLikedPost.filter(
          (id) => id !== post.id
        );

        await updateDoc(currentUserdocref, {
          likedPosts: filterPostWithoutId,
        });

        const updatedPostIndex = updatedPosts.findIndex(
          (item) => item.id === post.id
        );
        const updatedPostsCopy = [...updatedPosts];
        updatedPostsCopy[updatedPostIndex] = {
          ...updatedPostsCopy[updatedPostIndex],
          likes: updatedPostsCopy[updatedPostIndex].likes - 1,
        };
        setUpdatedPosts(updatedPostsCopy);
      } else {
        const updatePostWithLike = userPosts.map((item) => {
          if (item.id == post.id) {
            return { ...item, likes: item.likes + 1 };
          }
          return item;
        });

        await updateDoc(ownerdocref, {
          Posts: updatePostWithLike,
        });

        await updateDoc(currentUserdocref, {
          likedPosts: [...currentLikedPost, post.id],
        });

        const updatedPostIndex = updatedPosts.findIndex(
          (item) => item.id === post.id
        );
        const updatedPostsCopy = [...updatedPosts];
        updatedPostsCopy[updatedPostIndex] = {
          ...updatedPostsCopy[updatedPostIndex],
          likes: updatedPostsCopy[updatedPostIndex].likes + 1,
        };
        setUpdatedPosts(updatedPostsCopy);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const dislike = async (post) => {
    try {
      setLoading(true);
      const currentuser = await getDoc(currentUserdocref);
      const currentDislikedPost = currentuser.data().dislikedPosts || [];
      const currentLikedPost = currentuser.data().likedPosts || [];
      const userdata = await getDoc(ownerdocref);
      const userPosts = userdata.data().Posts;

      if (currentLikedPost.includes(post.id)) {
        return;
      }

      if (currentDislikedPost.includes(post.id)) {
        const updatePostRemoveDislike = userPosts.map((item) => {
          if (item.id == post.id) {
            return { ...item, dislikes: item.dislikes - 1 };
          }
          return item;
        });

        await updateDoc(ownerdocref, {
          Posts: updatePostRemoveDislike,
        });

        const filterPostWithoutId = currentDislikedPost.filter(
          (id) => id !== post.id
        );

        await updateDoc(currentUserdocref, {
          dislikedPosts: filterPostWithoutId,
        });

        const updatedPostIndex = updatedPosts.findIndex(
          (item) => item.id === post.id
        );
        const updatedPostsCopy = [...updatedPosts];
        updatedPostsCopy[updatedPostIndex] = {
          ...updatedPostsCopy[updatedPostIndex],
          dislikes: updatedPostsCopy[updatedPostIndex].dislikes - 1,
        };
        setUpdatedPosts(updatedPostsCopy);
      } else {
        const updatePostWithDislike = userPosts.map((item) => {
          if (item.id == post.id) {
            return { ...item, dislikes: item.dislikes + 1 };
          }
          return item;
        });

        await updateDoc(ownerdocref, {
          Posts: updatePostWithDislike,
        });

        await updateDoc(currentUserdocref, {
          dislikedPosts: [...currentDislikedPost, post.id],
        });

        const updatedPostIndex = updatedPosts.findIndex(
          (item) => item.id === post.id
        );
        const updatedPostsCopy = [...updatedPosts];
        updatedPostsCopy[updatedPostIndex] = {
          ...updatedPostsCopy[updatedPostIndex],
          dislikes: updatedPostsCopy[updatedPostIndex].dislikes + 1,
        };
        setUpdatedPosts(updatedPostsCopy);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}

      <main className="flex flex-col items-center justify-center gap-5 mb-20 mt-7">
        {updatedPosts?.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div className="max-w-md px-4 py-3 rounded-lg shadow-sm lg border-[1px] mx-4 p-3 border-zinc-800">
                <div>
                  <img
                    className="mx-auto rounded-lg w-[85vw] object-cover"
                    src={item?.image}
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={item?.Pic}
                    className="object-cover w-12 h-12 rounded-full"
                    alt=""
                  />
                  <h1 className="text-xl font-semibold">{item?.Name}</h1>
                </div>
                <p className="mt-3 text-sm leading-6">{item?.Text}</p>
                <div className="flex justify-around my-2">
                  <div className="flex items-center justify-center gap-3">
                    <BiLike
                      onClick={() => {
                        like(item);
                      }}
                      size={20}
                      color="white"
                      cursor="pointer"
                    />
                    <h1 className="text-sm">{item.likes}</h1>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <BiDislike
                      onClick={() => {
                        dislike(item);
                      }}
                      size={20}
                      color="white"
                      cursor="pointer"
                    />
                    <h1 className="text-sm">{item.dislikes}</h1>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </main>
    </>
  );
}

UsersPosts.propTypes = {
  posts: PropTypes.array,
};
