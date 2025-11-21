import React, { useContext, useRef, useState } from 'react';
import { UserDataContext } from '../../Context/UserDataContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LiaPhotoVideoSolid } from 'react-icons/lia';
import usePost from '../../Hooks/usePost';

export default function CreatePost() {

	let { user } = useContext(UserDataContext);
	const [fileName, setFileName] = useState("");
	const [showModal, setShowModal] = useState(false);
	let { register, handleSubmit, reset } = useForm();
	let fileInput = useRef();
	const createPostMutation = usePost(fileInput, reset, setShowModal)

	function handleFileChange(e) {
		const file = e.target.files[0];
		if (file) {
			setFileName(file.name);
		}
	}

	async function handlePostSubmit(obj) {
		const noText = !obj.body || obj.body.trim() === "";
		const noFile = fileInput.current.files.length === 0;

		if (noText && noFile) {
			toast.error("Post cannot be empty");
			return;
		}
		let formData = new FormData();

		if (fileInput.current.files.length > 0) {
			formData.append("image", fileInput.current.files[0]);
		}
		formData.append("body", obj.body);
		createPostMutation.createPost(formData)
	}

	return (
		<div>
			{/* ===== Mobile Compact View ===== */}
			<div className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg shadow-md sm:hidden">
				{user && <img src={user.photo} alt="" className="w-10 h-10 rounded-full object-cover" />}
				<input
					type="text"
					placeholder="What's on your mind?"
					className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-2 focus:outline-none text-sm"
					readOnly
					onClick={() => setShowModal(true)}
				/>
				<label className="cursor-pointer text-blue-600">
					<LiaPhotoVideoSolid size={22} />
					<input
						type="file"
						accept="image/*,video/*"
						className="hidden"
						ref={fileInput}
						onChange={handleFileChange}
					/>
				</label>
			</div>

			{/* ===== Desktop Full Form ===== */}
			<div className="hidden sm:block max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
				{user && (
					<div className='flex gap-2.5 items-center my-4'>
						<img src={user.photo} alt="" className='w-10 h-10 rounded-full object-cover' />
						<h2 className="text-xl font-semibold text-gray-800 dark:text-white">
							{user.name}
						</h2>
					</div>
				)}
				<form onSubmit={handleSubmit(handlePostSubmit)} className="space-y-4">
					<textarea
						{...register("body")}
						placeholder="What's on your mind?"
						className="w-full h-28 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
					></textarea>

					<div>
						<label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg w-fit text-gray-700 dark:text-gray-300">
							📷 Upload Photo/Video
							<input
								onChange={handleFileChange}
								ref={fileInput}
								type="file"
								accept="image/*,video/*"
								className="hidden"
							/>
						</label>
						{fileName && <p className="text-sm mt-1 text-gray-500">{fileName}</p>}
					</div>

					<button
						type="submit"
						className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
					>
						Post
					</button>
				</form>
			</div>

			{/* ===== Modal (Mobile Post Form) ===== */}
			{showModal && (
				<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-900 p-5 rounded-lg w-11/12 max-w-md ">
						<h2 className="text-lg font-semibold mb-4 dark:text-white">Create Post</h2>
						<form onSubmit={handleSubmit(handlePostSubmit)} className="space-y-4">
							<textarea
								{...register("body")}
								placeholder="What's on your mind?"
								className="w-full h-28 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
							></textarea>

							<div>
								<label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg w-fit text-gray-700 dark:text-gray-300">
									📷 Upload Photo/Video
									<input
										onChange={handleFileChange}
										ref={fileInput}
										type="file"
										accept="image/*,video/*"
										className="hidden"
									/>
								</label>
								{fileName && <p className="text-sm mt-1 text-gray-500">{fileName}</p>}
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
									Post
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
