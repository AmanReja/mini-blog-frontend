"use client";
import { use, React, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addPost, getAllpost, deletePost, updatePost } from "../redux/action";
import "../App.css";

const Page = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);
  const [isedit, setIsedit] = useState(false);
  const [currentid, setCurrentid] = useState(null);

  console.log(title);

  const handleopen = () => {
    setOpen((prev) => !prev);
  };

  const handeldelete = async (post) => {
    try {
      dispatch(deletePost(post._id)).then(() => {
        dispatch(getAllpost());
      });
    } catch (error) {
      console.error(error);
    }
  };

  const update = (post) => {
    setTitle(post.title),
      setContent(post.content),
      setIsedit(true),
      setCurrentid(post._id);
    setOpen(true);
    console.log(currentid);
  };

  const handelupdate = async (e) => {
    try {
      e.preventDefault();

      const updatedcontent = {
        title: title,
        content: content,
      };

      dispatch(updatePost(updatedcontent, currentid)).then(() => {
        dispatch(getAllpost());
      });
    } catch (error) {
      console.error(error);
    } finally {
      setTitle("");
      setContent("");
      setIsedit(false);
      setCurrentid(null);
      setOpen(false);
    }
  };

  const handelpostes = (e) => {
    try {
      e.preventDefault();

      const newpost = {
        title: title,
        content: content,
      };
      setLoad(true);
      dispatch(addPost(newpost)).then(() => {
        setLoad(false);
      });

      console.log(newpost);
    } catch (error) {
      console.log(error);
    } finally {
      setContent("");
      setTitle("");
    }

    console.log(title);
    console.log("All posts in store:", posts);
  };
  useEffect(() => {
    dispatch(getAllpost());
  }, [dispatch]);

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-r min-h-[100vh] h-auto from-green-50/50 via-teal-50 to-green-50/50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="flex flex-col gap-[10px]">
          <div className="w-[800px] h-[200px] px-[40px] pt-[50px]">
            <h1 className="sm:text-5xl text-3xl w-full sm:text-justify text-center sm:px-0 px-[220px] font-bold font-display ">
              Welcome To Admin page{" "}
              <span
                style={{ fontFamily: "montserrat" }}
                className="text-orange-400"
              >
                {" "}
                You Can now create posts
              </span>{" "}
            </h1>
          </div>
        </div>

        <div className="w-[400px] h-[100px] flex justify-evenly px-[10px] mt-[30px] items-centers">
          <button
            onClick={() => {
              handleopen();
            }}
            className="text w-[200px] h-[50px] text-white bg-orange-500 rounded-[12px] "
          >
            Create Posts
          </button>
        </div>

        <div
          className={` ${
            !open
              ? "w-0 h-0 duration-300 transition-all ease-in-out"
              : " mobile sm:w-[500px] h-auto w-full duration-300 ease-in-out"
          } transition-all duration-300 ease-in-out mb-[10px]  mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden relative`}
        >
          <div className="text-2xl py-4 px-6 flex bg-orange-400 justify-between items-center text-white text-center font-bold uppercase">
            {isedit ? <a>Update The Blog Post</a> : <a>Create A Blog Post</a>}
            <span
              onClick={() => {
                setOpen(false), setIsedit(false), setTitle(""), setContent("");
              }}
              className="bg-lime-400 rounded px-[10px] py-[10px]"
            >
              Close
            </span>
          </div>
          <form
            actions=""
            onSubmit={(e) => {
              isedit ? handelupdate(e) : handelpostes(e);
            }}
            className="py-4 px-6"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 text-left"
                htmlFor="title"
              >
                Post Title
              </label>

              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter your Post Title"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2 text-left"
                htmlFor="content"
              >
                Post Content
              </label>
              <textarea
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                type="text"
                placeholder="Enter your Post Content"
              />
            </div>

            <div className="flex items-center justify-center mb-4">
              {isedit ? (
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {!load ? <p>Update Post </p> : <div className="loader"></div>}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {!load ? <p> Create Post</p> : <div className="loader"></div>}
                </button>
              )}
            </div>
          </form>
        </div>
        {posts.length > 0 ? (
          <div className="w-full h-auto flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">All Posts</h2>
            <div className="w-full h-full flex flex-wrap px-[5px] justify-center gap-[10px] items-center">
              {posts.map((post, index) => (
                <div
                  key={index}
                  className=" shadow-2xl bg-gray-900 rounded-2xl p-4 w-[400px] mb-2 "
                >
                  <p>{post.createdAt}</p>
                  <h3 className="font-bold text-3xl">{post.title}</h3>
                  <p>{post.content}</p>
                  <div className="w-full h-[80px] px-[20px]  flex justify-evenly items-center">
                    <button
                      onClick={(e) => {
                        update(post);
                      }}
                      className="bg-orange-500 px-[20px] py-[10px] rounded-full"
                    >
                      PUDATE
                    </button>
                    <button
                      onClick={(e) => {
                        handeldelete(post);
                      }}
                      className="bg-red-500 px-[20px] py-[10px] rounded-full"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-10  text-white">No posts found.</p>
        )}
      </div>
    </>
  );
};

export default Page;
