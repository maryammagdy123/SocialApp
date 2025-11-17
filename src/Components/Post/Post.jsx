
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
	let loggedUsr = user?._id;

	let showPostOptions = postCreator == loggedUsr

	const location = useLocation()
	const isProfilePage = location.pathname === "/profile"



	return (
		<div
			style={{
				background: "var(--card-bg)",
				borderRadius: "var(--radius-lg)",
				boxShadow: "var(--shadow-sm)",
				padding: "var(--space-4)",
			}}
			className={`w-full mb-6`}
		>
			{/* User Info */}
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center gap-4">
					<img
						src={User?.photo}
						alt={body}
						className="w-10 h-10 rounded-full object-cover"
					/>
					<div>
						<h2 style={{ color: "var(--text-main)" }} className="font-semibold">
							{User.name}
						</h2>
						<p style={{ color: "var(--text-soft)" }} className="text-sm">
							{new Date(createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>

				{showPostOptions && <PostOptions _id={_id} postBody={body} postImage={image} />}
			</div>

			{/* Post Content */}
			<div className="mb-4">
				<p style={{ color: "var(--text-main)" }} className="mb-2">{body}</p>
				{image && (
					<img
						src={image}
						alt=""
						className="rounded-md w-full max-h-96 object-cover"
						style={{ borderRadius: "var(--radius-md)" }}
					/>
				)}
			</div>

			{/* Actions */}
			<div className="flex items-center justify-between gap-2 mb-4">
				<div className="flex items-center gap-2 cursor-pointer hover:text-blue-700" style={{ color: "var(--text-main)" }}>
					<FaRegComment className="text-base" />
					<span>{comments.length}</span>
				</div>
				{showDetailsButton && (
					<Link to={`/postDetails/${_id}`}>
						<p className="underline" style={{ color: "var(--accent)" }}>
							see post details
						</p>
					</Link>
				)}
			</div>

			{/* Latest Comments */}
			{comments.length > 0 && (
				<div
					style={{
						background: "var(--background)",
						borderRadius: "var(--radius-md)",
						padding: "var(--space-4)",
					}}
					className="mb-6"
				>
					<h3 style={{ color: "var(--text-main)" }} className="text-sm font-semibold my-2">
						{showAllComments ? "All comments:" : "Latest comment:"}
					</h3>

					{showAllComments
						? comments.map((comment, index) => (
							<div key={index} className="flex items-start gap-3 mb-3">
								<img
									src={comment?.commentCreator?._id === user?._id ? user?.photo : Image}
									alt="Comment user"
									className="w-8 h-8 rounded-full object-cover"
								/>
								<div
									style={{
										background: "var(--card-bg)",
										boxShadow: "var(--shadow-sm)",
										borderRadius: "var(--radius-md)",
									}}
									className="px-4 py-2 text-sm max-w-[80%]"
								>
									<span style={{ color: "var(--accent)", fontWeight: 600 }}>
										{comment?.commentCreator?._id === loggedUsr ? "You " : comment.commentCreator.name}
									</span>{" "}
									{comment.content}
								</div>
							</div>
						))
						: (() => {
							const lastComment = comments[comments.length - 1];
							return (
								<div className="flex items-start gap-3">
									<img
										src={lastComment?.commentCreator?._id === user?._id ? user?.photo : Image}
										alt="Comment user"
										className="w-8 h-8 rounded-full object-cover"
									/>
									<div
										style={{
											background: "var(--card-bg)",
											boxShadow: "var(--shadow-sm)",
											borderRadius: "var(--radius-md)",
										}}
										className="px-4 py-2 text-sm max-w-[80%]"
									>
										<span style={{ color: "var(--accent)", fontWeight: 600 }}>
											{lastComment.commentCreator?._id === loggedUsr ? "You " : lastComment.commentCreator?.name}
										</span>{" "}
										{lastComment.content}
									</div>
								</div>
							);
						})()}
				</div>
			)}

			{/* Add New Comment */}
			<AddComment postId={_id} />
		</div>

	);
}

