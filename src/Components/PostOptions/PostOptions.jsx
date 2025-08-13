import { initFlowbite } from 'flowbite';
import { useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';


export default function PostOptions({ _id, postBody, postImage }) {
	const fileInput = useRef();
	const [showModal, setShowModal] = useState(false);



	let { register, handleSubmit, reset } = useForm({
		defaultValues: {
			body: postBody,
			image: postImage
		}
	})
	useEffect(() => {
		initFlowbite();
	}, []);

	async function handleDeletePost() {
		let { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${_id}`, {
			headers: {
				token: localStorage.getItem("token")
			}
		});

		if (data?.message === "success") {
			toast.success("Post deleted successfully")
			setTimeout(() => {
				window.location.reload()
			}, 1000);
		}
	}

	async function handleUpdatePost(obj) {
		let formData = new FormData();

		if (fileInput.current.files.length > 0) {
			formData.append("image", fileInput.current.files[0]);
		}
		formData.append("body", obj.body);
		let { data } = await axios.put(`https://linked-posts.routemisr.com/posts/${_id}`, formData, {
			headers: { token: localStorage.getItem("token") }
		})
		if (data.message === "success") {
			toast.success("Post Updated!");
			fileInput.current.value = "";
			reset();
			window.location.reload()
		}
	}
	return (
		<>
			<button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle={"dropdownDotsHorizontal" + _id} className="inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
				<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
					<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
				</svg>
			</button>

			{/* <!-- Dropdown menu --> */}
			<div id={"dropdownDotsHorizontal" + _id} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600">
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
					<li className='flex  justify-center items-center' onClick={() => setShowModal(true)}>
						<span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit Post</span>
						<FaEdit size={20} className='text-green-500 ' />
					</li>
					<li onClick={handleDeletePost} className='flex  justify-center items-center cursor-pointer' >
						<span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >Delet Post</span>
						<AiFillDelete size={20} className='text-red-500' />
					</li>

				</ul>
				{/* ----------------------------------------------Update modal-------------------------------------------------------- */}


			</div>
			{showModal && (
				<div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center w-full h-full">
					<div className="bg-white dark:bg-gray-900 p-5 rounded-lg w-full max-w-lg mx-auto shadow-lg">
						<h2 className="text-lg font-semibold mb-4 dark:text-white">Update Post</h2>
						<form onSubmit={handleSubmit(handleUpdatePost)} className="space-y-4">
							<textarea
								{...register("body")}
								placeholder="What's on your mind?"
								className="w-full h-28 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
							></textarea>

							<div>
								<label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg w-fit text-gray-700 dark:text-gray-300">
									📷 Upload Photo/Video
									<input
										ref={fileInput}
										type="file"
										accept="image/*,video/*"
										className="hidden"
									/>
								</label>
							</div>

							<div className="flex justify-end gap-2">
								<button
									type="button"
									onClick={() => setShowModal(false)}
									className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
								>
									Save changes
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
