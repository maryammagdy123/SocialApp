import { initFlowbite } from 'flowbite';
import { useEffect, useRef, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import EditPostModal from '../MyPosts/EditPostModal';
import usePost from '../../Hooks/usePost';


export default function PostOptions({ _id, postBody, postImage }) {
	const fileInput = useRef();
	const [showModal, setShowModal] = useState(false);
	let { register, handleSubmit, reset } = useForm({
		defaultValues: {
			body: postBody,
			image: postImage
		}
	})

	const { updatePost } = usePost(fileInput, reset)
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
		// update post mutation
		updatePost({
			_id: _id,
			formData
		})

	}
	return (
		<>
			<button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle={"dropdownDotsHorizontal" + _id} className="inline-flex items-center p-2 text-sm font-medium text-center text-red-500 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
				<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
					<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
				</svg>
			</button>

			{/* <!-- Dropdown menu --> */}
			<div id={"dropdownDotsHorizontal" + _id} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
				<ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconHorizontalButton">
					<li className='flex  justify-center items-center' onClick={() => setShowModal(true)}>
						<span className="block px-4 py-2">Edit Post</span>
						<FaEdit size={20} className='text-green-500 ' />
					</li>
					<li onClick={handleDeletePost} className='flex  justify-center items-center cursor-pointer' >
						<span className="block px-4 py-2 " >Delet Post</span>
						<AiFillDelete size={20} className='text-red-500' />
					</li>

				</ul>
				{/* ----------------------------------------------Update modal-------------------------------------------------------- */}


			</div>
			{showModal && (
				<EditPostModal handleSubmit={handleSubmit} fileInput={fileInput} handleUpdatePost={handleUpdatePost} register={register} setShowModal={setShowModal} />
			)}
		</>
	)
}
