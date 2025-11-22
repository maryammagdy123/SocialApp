import React from 'react'

export default function EditPostModal({ handleSubmit, handleUpdatePost, register, fileInput, setShowModal }) {
	return (
		<div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center w-full h-full">
			<div className="bg-white dark:bg-gray-900 p-5 rounded-lg w-full max-w-lg  shadow-lg">
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
	)
}
