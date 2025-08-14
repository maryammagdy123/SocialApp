import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../Context/UserDataContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import MyPosts from '../../Components/MyPosts/MyPosts';


export default function Profile() {


	const [isEditing, setIsEditing] = useState(false);
	let { user, setUser } = useContext(UserDataContext)
	let { register, handleSubmit } = useForm()
	async function changeProfilePhoto(img) {
		const imgFile = img.photo[0];
		let formData = new FormData();
		formData.append("photo", imgFile)

		let { data } = await axios.put('https://linked-posts.routemisr.com/users/upload-photo', formData, {
			headers: {
				token: localStorage.getItem('token')
			}
		})
		if (data.message === "success") {
			setUser()
			toast.success("Photo changed successfully")
			setIsEditing(false)
		}
	}



	return (
		<>
			{/*------------------------------------------------- user's profile information-------------------------------- */}
			<div className="lg:ml-64 p-4 sm:p-6  min-h-screen  bg-white transition-all">
				<div className="max-w-6xl mx-auto mt-18 bg-gray-900 shadow-md p-4 sm:p-6 ">

					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
						<h1 className="text-2xl sm:text-3xl font-bold text-white ">
							My Profile
						</h1>
						<button
							onClick={() => setIsEditing(!isEditing)}
							className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-1/4 text-center sm:w-auto"
						>
							{isEditing ? "Cancel" : "Edit"}
						</button>
					</div>

					{/* Form */}
					<form className="space-y-6" onSubmit={handleSubmit(changeProfilePhoto)}>
						{user && (
							<>
								{/*Profile photo */}
								<div className="flex flex-col sm:items-center sm:justify-center gap-4 sm:gap-6">
									<img
										src={user.photo}
										alt="Profile"
										className="w-24 h-24 rounded-full object-cover border mx-auto sm:mx-0"
									/>

									{/* photo input upload  */}

									{isEditing && (
										<label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mx-auto w-auto ">
											Change Photo
											<input {...register('photo')} type="file" accept="image/*" className="hidden" />
										</label>
									)}
								</div>


							</>
						)}

						{/* Save buttons*/}
						{isEditing && (
							<div className="flex flex-col sm:flex-row justify-end gap-3">
								<button
									type="button"
									onClick={() => setIsEditing(false)}
									className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 w-full sm:w-auto"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition w-full sm:w-auto"
								>
									Save
								</button>
							</div>
						)}
					</form>

					{user &&
						<div className='flex flex-col   gap-4 sm:gap-6 w-full'>
							{/* Name*/}
							<div>
								<label className="block mb-1 font-medium text-white ">
									Full Name
								</label>
								<input
									type="text"
									disabled={!isEditing}
									defaultValue={user.name}
									className={`w-full px-4 py-2 border rounded-lg ${isEditing
										? "focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 text-white"
										: "bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-black"
										}`}
								/>
							</div>

							{/* Email */}
							<div >
								<label className="block mb-1 font-medium  text-white">
									Email
								</label>
								<input
									type="email"
									disabled={!isEditing}
									defaultValue={user.email}
									className={`w-full px-4 py-2 border rounded-lg ${isEditing
										? "focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
										: "bg-gray-100 dark:bg-gray-700 cursor-not-allowed text-black"
										}`}
								/>
							</div>


						</div>}
				</div>


				<MyPosts />
			</div>



		</>
	);
}
