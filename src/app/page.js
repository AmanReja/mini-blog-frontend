"use client";
import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllpost } from "./redux/action";
import Link from "next/link";
import "./App.css";

const Page = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    const fetchposts = async () => {
      try {
        setLoad(true);
        await dispatch(getAllpost());
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false);
      }
    };
    fetchposts();
  }, [dispatch]);
  return (
    <>
      <div className="flex w-full flex-col items-center  justify-center text-center py-20 bg-gradient-to-r h-auto min-h-[100vh] from-green-50/50 via-teal-50 to-green-50/50  dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
        <div className="flex sm:px-[40px] px-[20px]  flex-col gap-[10px] h-[400px] mt-[20px]">
          <h1 className="sm:w-full sm:px-[20px] px-[60px] w-full  text-center font-display text-3xl font-bold tracking-normal text-white-300  sm:text-7xl">
            Welcome To Myblog Here
            <span className="relative whitespace-nowrap text-white-600 dark:text-gray-300">
              You Can Find Our
            </span>
            <span className="relative whitespace-nowrap text-orange-500 dark:text-orange-300">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-500 dark:fill-orange-300/60"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.780 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.810 23.239-7.825 27.934-10.149 28.304-14.005 .417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Latest Blog</span>
            </span>
          </h1>
          <h2 className="mx-auto w-full px-[40px] mt-12 max-w-xl text-lg sm:text-white-400 text-white-500 dark:text-gray-300 leading-7">
            Dive into a world of insights, stories, and inspiration. Our blog is
            where ideas meet clarity — whether you're seeking knowledge, tips,
            or just a fresh perspective, you're in the right place. Explore the
            latest posts and let your curiosity lead the way.
          </h2>
        </div>

        <div className="w-[400px] h-[100px] flex justify-evenly px-[10px] mt-[30px] items-centers">
          <Link href="/admin">
            <button className="text w-[150px] h-[50px] bg-black rounded-[12px] ">
              Admin
            </button>
          </Link>
          <button className="text w-[100px] h-[50px] bg-orange-500 rounded-[12px] ">
            User
          </button>
        </div>
        {load ? (
          <div className="loader"></div>
        ) : (
          <div className="w-full px-[5px]">
            {posts.length > 0 ? (
              <div className="w-full h-auto flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  All Posts
                </h2>
                <div className="w-full h-full flex flex-wrap px-[10px] justify-center gap-[10px] items-center">
                  {posts.map((post, index) => (
                    <div
                      key={index}
                      className=" shadow-2xl bg-gray-900 rounded-2xl p-4 w-[400px] mb-2 "
                    >
                      <p>{post.createdAt}</p>
                      <h3
                        style={{ fontFamily: "playfear display" }}
                        className="font-bold text-3xl px-[50px]"
                      >
                        {post.title}
                      </h3>
                      <p
                        style={{ fontFamily: "montserrat" }}
                        className="font-light"
                      >
                        {post.content}
                      </p>
                      <div className="w-full h-[80px] px-[20px]  flex justify-evenly items-center">
                        <Link href={`/posts/${post._id}`}>
                          <button className="bg-orange-500 px-[20px] py-[10px] rounded-full">
                            View details
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-10  text-white">No posts found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
