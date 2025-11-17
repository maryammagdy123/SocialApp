import React, { useContext, useState } from 'react'
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
			headers: { token: localStorage.getItem('token') }
		})

		if (data.message === "success") {
			setUser({ ...user, photo: URL.createObjectURL(imgFile) })
			toast.success("Photo changed successfully")
			setIsEditing(false)
		}
	}

	return (
		<div className="lg:ml-64 p-4 sm:p-6 min-h-screen" style={{ background: "var(--background)" }}>
			<div
				className="max-w-6xl mx-auto mt-18 shadow-md p-4 sm:p-6"
				style={{ background: "var(--card-bg)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-md)" }}
			>
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
					<h1 style={{ color: "var(--text-main)" }} className="text-2xl sm:text-3xl font-bold">My Profile</h1>
					<button
						onClick={() => setIsEditing(!isEditing)}
						className="bg-primary-600 hover:bg-primary-700 text-red-400 px-4 py-2 rounded-lg w-1/4 text-center sm:w-auto"
					>
						{isEditing ? "Cancel" : "Edit"}
					</button>
				</div>

				{/* Profile photo and form */}
				<form className="space-y-6" onSubmit={handleSubmit(changeProfilePhoto)}>
					{user && (
						<div className="flex flex-col sm:items-center sm:justify-center gap-4 sm:gap-6">
							<img
								src={user.photo}
								alt="Profile"
								className="w-24 h-24 rounded-full object-cover border mx-auto sm:mx-0"
							/>
							{isEditing && (
								<label className="cursor-pointer bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white px-4 py-2 rounded-lg mx-auto w-auto">
									Change Photo
									<input {...register('photo')} type="file" accept="image/*" className="hidden" />
								</label>
							)}
						</div>
					)}

					{/* Fields */}
					<div className="flex flex-col gap-4 sm:gap-6 w-full">
						<div>
							<label style={{ color: "var(--text-main)" }} className="block mb-1 font-medium">Full Name</label>
							<input
								type="text"
								disabled={isEditing}
								defaultValue={user?.name}
								className={`w-full px-4 py-2 border rounded-lg ${isEditing
									? "focus:ring-2 focus:ring-primary-600 bg-card-bg border-gray-700 text-text-main"
									: "bg-gray-100 cursor-not-allowed text-text-main border-gray-700"
									}`}
							/>
						</div>

						<div>
							<label style={{ color: "var(--text-main)" }} className="block mb-1 font-medium">Email</label>
							<input
								type="email"
								disabled={isEditing}
								defaultValue={user?.email}
								className={`w-full px-4 py-2 border rounded-lg ${isEditing
									? "focus:ring-2 focus:ring-primary-600 bg-card-bg border-gray-700 text-text-main"
									: "bg-gray-100 cursor-not-allowed text-text-main border-gray-700"
									}`}
							/>
						</div>
					</div>

					{/* Save buttons */}
					{isEditing && (
						<div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
							<button
								type="button"
								onClick={() => setIsEditing(false)}
								className="px-5 py-2 rounded-lg border border-gray-700 hover:bg-gray-200 w-full sm:w-auto text-text-main"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white px-6 py-2 rounded-lg font-medium transition w-full sm:w-auto"
							>
								Save
							</button>
						</div>
					)}
				</form>
			</div>

			{/* User Posts */}
			<div className="mt-6">
				<MyPosts />
			</div>
		</div>

	)
}
