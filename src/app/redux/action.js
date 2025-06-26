"use client";
const baseUrl = "http://localhost:5000";
import Swal from "sweetalert2";

export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const GETALL_POST = "GETALL_POST";
export const UPDATE_POST = "UPDATE_POST";

export const getAllpost = () => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/admin/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    dispatch({ type: "GETALL_POST", payload: data });
  } catch (error) {
    console.error("Error fetching posts:", error);
    alert("Failed to fetch posts");
  }
};

export const addPost = (postData) => async (dispatch) => {
  try {
    const request = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(postData),
    };
    const response = await fetch(`${baseUrl}/admin/posts`, request);

    if (response.status == 201) {
      Swal.fire({
        title: "Your Blog Has Created Successfully ",
        icon: "success",
      });
    } else {
      throw new Error("Failed to submit post");
    }

    const data = await response.json();
    dispatch({ type: "ADD_POST", payload: data });
  } catch (error) {
    console.error("Error submitting post:", error);
    alert("Failed to submit post");
  }
};

export const deletePost = (postid) => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/admin/posts/${postid}`, {
      method: "DELETE",
    });
    if (response.status == 200) {
      Swal.fire({
        title: "Your Blog Has Been Successfully Deleted ",
        icon: "success",
      });
    } else {
      throw new Error("Failed to submit post");
    }
    const data = await response.json();
    dispatch({ type: "DELETE_POST", payload: data.id }); // Pass the ID of the deleted post
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete post");
  }
};

export const updatePost = (updateData, postid) => async (dispatch) => {
  try {
    const response = await fetch(`${baseUrl}/admin/posts/${postid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (response.status == 200) {
      Swal.fire({
        title: "Your Blog Has Been Successfully Updated ",
        icon: "success",
      });
    } else {
      throw new Error("Failed to submit post");
    }
    const data = await response.json();
    dispatch({ type: "UPDATE_POST", payload: data });
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Failed to update post");
  }
};
