
// this is the post component (post card )
// this is for creating the post card ui design only
// prpperties of the postsList will be passed to this componnet (from feeds to post)


import { useContext } from 'react';
import Image from '/image.png';

import { FaHeart, FaRegComment } from 'react-icons/fa';
import { Link, useLocation } from 'react-router';
import PostOptions from '../PostOptions/PostOptions';
import { UserDataContext } from '../../Context/UserDataContext';
import AddComment from '../AddComment/AddComment';


export default function Post({ post, showDetailsButton = true, showAllComments = true }) {

	let _id = post?._id;
	let body = post?.body;
	let image = post?.image;
	let User = post?.user;
	let createdAt = post?.createdAt;
	let comments = post?.comments || [];
	let { user } = useContext(UserDataContext)

	let postCreator = User._id;
	let loggedUsr = user._id;

	let showPostOptions = postCreator == loggedUsr

	const location = useLocation()
	const isProfilePage = location.pathname === "/profile"



	return (
		<div className={` bg-gray-900 rounded-xl shadow-md py-6 px-4 sm:px-6 ${isProfilePage ? "max-w-lg" : "w-full"}`}>

			{/* User Info */}
			<div className='flex justify-between items-center'>
				<div className="flex items-center gap-4 mb-4">
					<img
						src={User?.photo}
						alt={body}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<h2 className="font-semibold text-white">{User.name}</h2>
						<p className="text-sm text-white">
							{new Date(createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>

				{
					// if the post creator the same as the one who is logged in then show the post op
					showPostOptions && <PostOptions _id={_id} postBody={body} postImage={image} />
				}
			</div>

			{/* Post Content */}
			<div className="mb-4">
				<p className="text-white mb-2">{body}</p>
				{image && <img src={image} alt="" className="rounded-md w-full max-h-96 object-cover" />}
			</div>

			{/* Actions */}
			<div className="flex items-center justify-between gap-2 mb-4 text-white">
				<div className='flex items-center justify-between gap-2 hover:text-blue-700  '>
					<FaRegComment className="text-base" />
					<span>{comments.length}</span>
				</div>
				{showDetailsButton && (
					<Link to={`/postDetails/${_id}`}>
						<p className='text-blue-700 underline'>see post details</p>
					</Link>
				)}


			</div>

			{/* Latest Comment */}
			{comments.length > 0 && (
				<div className="bg-gray-50 border rounded-xl p-4 mb-6">
					<h3 className="text-sm font-semibold text-black my-2">
						{showAllComments ? "All comments:" : "Latest comment:"}
					</h3>

					{showAllComments ? (
						// All comments to show
						comments.map((comment, index) => (

							<div key={index} className="flex items-start gap-3 mb-3">
								<img
									src={comment?.commentCreator?._id == user._id ? user.photo : Image}
									alt="Comment user"
									className="w-8 h-8 rounded-full object-cover"
								/>
								<div className="bg-white px-4 py-2 rounded-lg shadow text-sm text-black max-w-[80%]">
									<span className="font-semibold text-blue-600">
										{/* {comment.commentCreator?.name || "User"}: */}
										{comment?.commentCreator?._id == loggedUsr ? "You " : comment.commentCreator.name}
									</span>{" "}
									{comment.content}
								</div>
							</div>
						))
					) : (
						// Last comment
						<div className="flex items-start gap-3">
							<img
								src={comments[comments.length - 1]?.commentCreator?._id == user._id ? user.photo : Image}
								alt="Comment user"
								className="w-8 h-8 rounded-full object-cover"
							/>
							<div className="bg-white px-4 py-2 rounded-lg shadow text-sm text-black max-w-[80%]">
								<span className="font-semibold text-blue-600">
									{/* {comments[comments.length - 1].commentCreator?.name || "User"}: */}
									{comments[comments.length - 1].commentCreator?._id == loggedUsr ? "You " : comments[comments.length - 1].commentCreator?.name}
								</span>{" "}
								{comments[comments.length - 1].content}
							</div>
						</div>
					)}
				</div>
			)}


			{/* Add New Comment */}
			<AddComment postId={_id} />

		</div>
	);
}

