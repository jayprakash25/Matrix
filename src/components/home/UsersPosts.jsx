import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiDislike, BiLike } from "react-icons/bi";
import { updateDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import { useAuth } from "../../ContextProvider/AuthContext";
import Loader from "../Loader";
import { AiTwotoneLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";

export default function UsersPosts({ posts }) {
  const PostOwnerId = posts[0].userId;

  const { currentUser } = useAuth();

  const ownerdocref = doc(db, "USERS", PostOwnerId);

  const jwt = currentUser.uid;

  const [updatedPosts, setUpdatedPosts] = useState(posts[0].posts || []);

  const [likedpost, setLikedPost] = useState([]);

  const [dislikedpost, setdislikedpost] = useState([]);

  const currentUserdocref = doc(db, "USERS", jwt);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentuser = await getDoc(currentUserdocref);
        const currentLikedPost = (await currentuser.data().likedPosts) || [];
        const currentdisLikedPost =
          (await currentuser.data().dislikedPosts) || [];
        setLikedPost(currentLikedPost);
        setdislikedpost(currentdisLikedPost);
      } catch (error) {
        console.log(error);
      }
    };

    const unsubscribe = onSnapshot(ownerdocref, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        const userPosts = userData.Posts || [];
        setUpdatedPosts(userPosts);
      }
    });
    fetchUserData();
    return () => {
      unsubscribe();
    };
  }, [currentUserdocref, ownerdocref]);

  const unlike = async (post) => {
    try {
      setLoading(true);

      const updatelikedpost = likedpost.filter((id) => id !== post.id);
      setLikedPost(updatelikedpost);

      const updateremovelike = updatedPosts.map((item) => {
        if (item.id === post.id) {
          return { ...item, likes: item.likes - 1 };
        }
        return item;
      });

      setUpdatedPosts(updateremovelike);

      await updateDoc(currentUserdocref, {
        likedPosts: updatelikedpost,
      });

      await updateDoc(ownerdocref, {
        Posts: updateremovelike,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const like = async (post) => {
    try {
      const Userdata = await getDoc(currentUserdocref);

      const dislikedids = Userdata.data().dislikedPosts || [];

      if (dislikedids.includes(post.id)) {
        return;
      } else {
        setLoading(true);
        const updatePostWithLike = updatedPosts.map((item) => {
          if (item.id === post.id) {
            return { ...item, likes: item.likes + 1 };
          }
          return item;
        });

        setUpdatedPosts(updatePostWithLike);

        await updateDoc(ownerdocref, {
          Posts: updatePostWithLike,
        });

        const updatedLikedPost = [...likedpost, post.id];
        setLikedPost(updatedLikedPost);

        await updateDoc(currentUserdocref, {
          likedPosts: updatedLikedPost,
        });

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const undislike = async (Post) => {
    try {
      setLoading(true);

      const updatedislikedpost = dislikedpost.filter((id) => id !== Post.id);
      setdislikedpost(updatedislikedpost);

      await updateDoc(currentUserdocref, {
        dislikedPosts: updatedislikedpost,
      });

      const updateremovedislike = updatedPosts.map((item) => {
        if (item.id === Post.id) {
          return { ...item, dislikes: item.dislikes - 1 };
        }
        return item;
      });

      setUpdatedPosts(updateremovedislike);

      await updateDoc(ownerdocref, {
        Posts: updateremovedislike,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const dislike = async (post) => {
    try {
      const Userdata = await getDoc(currentUserdocref);

      const likedids = Userdata.data().likedPosts || [];

      if (likedids.includes(post.id)) {
        return;
      } else {
        setLoading(true);
        const updatePostWithDislike = updatedPosts.map((item) => {
          if (item.id === post.id) {
            return { ...item, dislikes: item.dislikes + 1 };
          }
          return item;
        });

        setUpdatedPosts(updatePostWithDislike);

        await updateDoc(ownerdocref, {
          Posts: updatePostWithDislike,
        });

        const updatedDislikedPost = [...likedpost, post.id];
        setLikedPost(updatedDislikedPost);

        await updateDoc(currentUserdocref, {
          dislikedPosts: updatedDislikedPost,
        });

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <main className="flex flex-col items-center justify-center gap-5 mb-20 mt-7">
        {updatedPosts?.map((item, i) => {
          return (
            <React.Fragment key={i}>
              <div
                data-aos="fade-up"
                className="max-w-md px-4 py-3 rounded-lg shadow-sm lg border-[1px] mx-4 p-3 border-zinc-800"
              >
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
                    {likedpost?.includes(item.id) ? (
                      <AiTwotoneLike
                        onClick={() => {
                          unlike(item);
                        }}
                        size={20}
                        color="white"
                        cursor="pointer"
                      />
                    ) : (
                      <BiLike
                        onClick={() => {
                          like(item);
                        }}
                        size={20}
                        color="white"
                        cursor="pointer"
                      />
                    )}
                    <h1 className="text-sm">{item.likes}</h1>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {dislikedpost.includes(item.id) ? (
                      <BiSolidDislike
                        onClick={() => {
                          undislike(item);
                        }}
                        size={20}
                        color="white"
                        cursor="pointer"
                      />
                    ) : (
                      <BiDislike
                        onClick={() => {
                          dislike(item);
                        }}
                        size={20}
                        color="white"
                        cursor="pointer"
                      />
                    )}
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
