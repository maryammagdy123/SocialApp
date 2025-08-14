import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AddComment({ postId }) {
	let { register, handleSubmit, reset } = useForm()

	async function handleAddComment(value) {
		let { data } = await axios.post(`https://linked-posts.routemisr.com/comments`,
			{
				...value,
				post: postId
			}, {
			headers: {
				token: localStorage.getItem("token")
			}
		})

		console.log(data)
		if (data.message === "success") {
			toast.success("comment added ")
			reset()
			setTimeout(() => {
				window.location.reload()

			}, 1000)
		}
	}
	return (
		<div className="mt-2 text-white">
			<form onSubmit={handleSubmit(handleAddComment)} className="flex items-center gap-2">
				<input
					{...register("content")}
					type="text"
					placeholder="Write a comment..."
					className="flex-1 border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition"
				>
					Add
				</button>
			</form>
		</div>

	)
}
