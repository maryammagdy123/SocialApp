import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../Context/UserDataContext";
import axios from "axios";
import { FaRegCommentDots } from "react-icons/fa";
import AddComment from "../AddComment/AddComment";

export default function MyPosts() {
	let { user, setUser } = useContext(UserDataContext);


	let [posts, setPosts] = useState([]);
	let [loading, setLoading] = useState(true);
	const [openPostId, setOpenPostId] = useState(null);

	useEffect(() => {
		getMyPosts();


	}, []);

	async function getMyPosts() {
		setLoading(true);
		try {
			let { data } = await axios.get(
				`https://linked-posts.routemisr.com/users/${user._id}/posts?limit=10`,
				{
					headers: {
						token: localStorage.getItem("token"),
					},
				}
			)
			if (data.message === "success") {
				setPosts(data?.posts);
				setUser()

			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="my-6 ">
			<div className="flex flex-col justify-center  text-black my-4">
				<h1 className="text-2xl p-2">Posts</h1>
				<div className="w-[20%] rounded-2xl h-[10px]  bg-blue-500"></div>
			</div>
			{loading ? (
				<p>Loading...</p>
			) : (
				posts.map((post) => (
					<div key={post._id} className="bg-gray-900 shadow-md p-4 mb-6 space-y-6 mx-auto   ">
						{/* Post content */}
						{/* User Info */}
						<div className="flex items-center gap-3 ">
							<img
								src={user?.photo || "https://via.placeholder.com/40"}
								alt={user?.name || "User"}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<span className="text-white font-medium">
								{user?.name || "Unknown User"}
							</span>
						</div>

						{/* Post Image */}
						{post.image && (
							<img
								src={post.image}
								alt="Post"
								className="rounded-lg max-h-60 object-cover"
							/>
						)}

						{/* Post Body */}
						<p className="text-white">{post.body}</p>

						{/* Post footer */}
						<div className="flex items-center justify-between border-t pt-3 text-gray-500 text-sm">
							<span>{post.likes?.length || 0} Likes</span>

							<button
								className="flex items-center gap-1 hover:text-blue-600"
								onClick={() =>
									setOpenPostId(openPostId === post._id ? null : post._id)
								}
							>
								<FaRegCommentDots />
								{post.comments?.length || 0}
							</button>
						</div>
						<AddComment postId={post._id}  />

						{/* Comments section */}
						{openPostId === post._id && (
							<div className="mt-3 space-y-2">
								{post.comments?.length > 0 ? (
									post.comments.map((comment, i) => (
										<div key={i} className="flex items-start gap-3">

											<img

												src={
													comment?.commentCreator?._id == user._id ? user.photo : comment?.comments?.commentCreator?.photo
												}
												alt="Comment user"
												className="w-8 h-8 rounded-full object-cover"
											/>
											<div className="bg-gray-100 px-4 py-2 rounded-lg shadow text-sm text-black max-w-[80%]">
												<span className="font-semibold text-blue-600">
													{comment?.commentCreator?._id == user._id ? "You " : comment.commentCreator.name}
												</span>{" "}
												{comment.content}
											</div>
											{/* adding comment */}

										</div>
									))
								) : (
									<p className="text-gray-400 text-sm">No comments yet</p>
								)}
							</div>
						)}
					</div>
				))
			)}
		</div>
	);


}



