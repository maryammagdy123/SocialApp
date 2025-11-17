import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function AddComment({ postId }) {
	const { register, handleSubmit, reset } = useForm();

	async function handleAddComment(value) {
		try {
			let { data } = await axios.post(
				`https://linked-posts.routemisr.com/comments`,
				{
					...value,
					post: postId
				},
				{
					headers: {
						token: localStorage.getItem("token")
					}
				}
			);

			if (data.message === "success") {
				toast.success("Comment added");
				reset();
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			}
		} catch (err) {
			toast.error(err.response?.data?.error || "Failed to add comment");
		}
	}

	return (
		<div style={{ color: "var(--text-main)" }} className="mt-2">
			<form onSubmit={handleSubmit(handleAddComment)} className="flex items-center gap-2">
				<input
					{...register("content")}
					type="text"
					placeholder="Write a comment..."
					style={{
						background: "var(--card-bg)",
						borderColor: "var(--border)",
						color: "var(--text-main)"
					}}
					className="flex-1 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-600)] transition"
				/>
				<button
					type="submit"
					style={{ background: "var(--primary-600)", color: "white" }}
					className="px-4 py-2 rounded-full text-sm hover:bg-[var(--primary-700)] transition"
				>
					Add
				</button>
			</form>
		</div>
	);
}
